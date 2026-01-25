import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";
import { firstValueFrom } from "rxjs";

import {
  CreditApplication,
  CreditApplicationDocument,
} from "./schemas/credit-application.schema";
import { CreateCreditApplicationDto } from "./dto/create-credit-application.dto";
import { User, UserDocument } from "../auth/schemas/user.schema";
import { Account, AccountDocument } from "../accounts/schemas/account.schema";
import {
  ExplainabilityDecision,
  RiskReason,
  CreditLetterPayload,
  CreditLetter,
} from "./types/explainability.types";


@Injectable()
export class CreditApplicationsService {
  private readonly mlUrl: string;

  constructor(
    @InjectModel(CreditApplication.name)
    private readonly creditAppModel: Model<CreditApplicationDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mlUrl = this.configService.get<string>("ML_CREDIT_URL") ?? "";
  }

  private computeAge(birthdate: string): number {
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  private mapCurrentBalanceToLaufkont(balance: number): number {
    if (balance === null || balance === undefined) {
      return 1; // sin cuenta / desconocido
    }
    if (balance < 0) {
      return 2; // saldo < 0
    }
    if (balance >= 0 && balance < 200) {
      return 3; // 0 ≤ saldo < 200
    }
    return 4; // >= 200 o salario >= 1 año
  }

  private mapSavingsToSparkont(balance: number): number {
    if (balance === null || balance === undefined) {
      return 1; // desconocido / sin ahorros
    }
    if (balance < 100) {
      return 2;
    }
    if (balance >= 100 && balance < 500) {
      return 3;
    }
    if (balance >= 500 && balance < 1000) {
      return 4;
    }
    return 5; // >= 1000
  }

  private mapProbabilityToBand(p: number): "LOW" | "MEDIUM" | "HIGH" {
    if (p < 0.33) return "LOW";
    if (p < 0.66) return "MEDIUM";
    return "HIGH";
  }

  async createForUser(
    userId: string,
    dto: CreateCreditApplicationDto,
  ) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    const account = await this.accountModel
      .findOne({ user: user._id })
      .exec();

    if (!account) {
      throw new NotFoundException("Cuenta asociada no encontrada");
    }

    const age = this.computeAge(user.birthdate);

    const laufkont =
      dto.accountStatus ??
      this.mapCurrentBalanceToLaufkont(account.currentAccountBalance);

    const sparkont =
      dto.savings ??
      this.mapSavingsToSparkont(account.savingsAccountBalance);
      
    // Payload esperado microservicio FastAPI
    const mlPayload = {
      Status: laufkont,                        // antes: laufkont
      Duration: dto.durationMonths,           // antes: laufzeit
      CreditHistory: dto.creditHistory,       // moral
      Purpose: dto.purpose,                   // verw
      CreditAmount: dto.amount,               // hoehe
      Savings: sparkont,                      // sparkont
      EmploymentDuration: dto.employmentDuration, // beszeit
      InstallmentRate: dto.installmentRate,   // rate
      PersonalStatusSex: dto.personalStatusSex,   // famges
      OtherDebtors: dto.otherDebtors,         // buerge
      PresentResidence: dto.presentResidence, // wohnzeit
      Property: dto.property,                 // verm
      Age: age,                               // alter
      OtherInstallmentPlans: dto.otherInstallmentPlans, // weitkred
      Housing: dto.housing,                   // wohn
      NumberExistingCredits: dto.numberCredits,     // bishkred
      Job: dto.job,                           // beruf
      PeopleLiable: dto.peopleLiable,         // pers
      Telephone: dto.telephone,               // telef
      ForeignWorker: dto.foreignWorker,       // gastarb
    };


    if (!this.mlUrl) {
      throw new InternalServerErrorException(
        "ML_CREDIT_URL no está configurado",
      );
    }

    let mlResponse: any;
    try {
      const resp$ = this.http.post(`${this.mlUrl}`, mlPayload);
      const resp = await firstValueFrom(resp$);
      mlResponse = resp.data;
    } catch (err) {
      throw new InternalServerErrorException(
        "Error al llamar al microservicio de ML",
      );
    }

    const probabilityDefault =
      mlResponse.probability_default ??
      mlResponse.probabilityDefault ??
      0;

    const riskBand: "LOW" | "MEDIUM" | "HIGH" =
      mlResponse.risk_band ??
      mlResponse.riskBand ??
      this.mapProbabilityToBand(probabilityDefault);

    const topFeatures =
      mlResponse.top_features ?? mlResponse.topFeatures ?? [];

    const doc = new this.creditAppModel({
      user: new Types.ObjectId(userId),
      laufkont,
      sparkont,
      age,
      durationMonths: dto.durationMonths,
      purpose: dto.purpose,
      amount: dto.amount,
      employmentDuration: dto.employmentDuration,
      installmentRate: dto.installmentRate,
      creditHistory: dto.creditHistory,
      personalStatusSex: dto.personalStatusSex,
      otherDebtors: dto.otherDebtors,
      presentResidence: dto.presentResidence,
      property: dto.property,
      otherInstallmentPlans: dto.otherInstallmentPlans,
      housing: dto.housing,
      numberCredits: dto.numberCredits,
      job: dto.job,
      peopleLiable: dto.peopleLiable,
      telephone: dto.telephone,
      foreignWorker: dto.foreignWorker,
      probabilityDefault,
      riskBand,
      topFeatures,
    });

    const saved = await doc.save();

    return {
      id: saved._id,
      probabilityDefault,
      riskBand,
      topFeatures,
      createdAt: saved.createdAt,
    };
  }

  async findByUser(userId: string) {
    return this.creditAppModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findLatestByUser(userId: string) {
    return this.creditAppModel
      .findOne({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

// ---------------- Letter Ml helpers services ------------------------------------------

  private inferDecisionFromRisk(
    riskBand: 'LOW' | 'MEDIUM' | 'HIGH',
    probabilityDefault: number,
  ): ExplainabilityDecision {
    if (riskBand === 'LOW' && probabilityDefault < 0.25) {
      return 'APPROVE';
    }
    if (riskBand === 'MEDIUM' || (riskBand === 'LOW' && probabilityDefault >= 0.25)) {
      return 'REVIEW';
    }
    return 'DECLINE';
  }

  private buildReasonsFromApplication(
    app: CreditApplicationDocument,
  ): RiskReason[] {
    const reasons: RiskReason[] = [];

    // 1) Ejemplo: compromiso de ingresos alto
    if (app.installmentRate >= 3) {
      reasons.push({
        code: 'HIGH_DEBT_BURDEN',
        title: 'Alto compromiso de ingresos',
        evidence:
          'La cuota del crédito representa una proporción elevada de tus ingresos estimados.',
        customerTip:
          'Considera reducir tus deudas de corto plazo o solicitar un monto menor para mejorar tu perfil.',
        weight: 0.9,
      });
    }

    // 2) Ejemplo: ahorro bajo 
    if ((app as any).sparkont && (app as any).sparkont <= 2) {
      reasons.push({
        code: 'LOW_SAVINGS',
        title: 'Ahorro disponible limitado',
        evidence:
          'Tu nivel de ahorro registrado es reducido en relación con el monto solicitado.',
        customerTip:
          'Incrementar tu ahorro mensual y mantener un saldo estable puede mejorar tu perfil de riesgo.',
        weight: 0.7,
      });
    }

    // 3) Ejemplo: historial crediticio débil
    if (app.creditHistory <= 1) {
      reasons.push({
        code: 'WEAK_CREDIT_HISTORY',
        title: 'Historial crediticio limitado o con incidencias',
        evidence:
          'Se detecta un historial crediticio limitado o con eventos críticos recientes.',
        customerTip:
          'Mantener tus pagos al día durante un periodo más largo ayudará a fortalecer tu historial.',
        weight: 0.8,
      });
    }

    // 4) Usar topFeatures del modelo 
    if (Array.isArray(app.topFeatures) && app.topFeatures.length > 0) {
      const top = app.topFeatures.slice(0, 3);
      for (const f of top) {
        reasons.push({
          code: `MODEL_FEATURE_${String(f.feature).toUpperCase()}`,
          title: `Factor del modelo: ${f.feature}`,
          evidence: 'Este factor tuvo un impacto relevante en el cálculo del riesgo.',
          customerTip:
            'Revisa este aspecto de tu perfil (por ejemplo, monto solicitado, plazo o nivel de endeudamiento).',
          weight: Math.abs(f.impact ?? 0),
        });
      }
    }

    if (reasons.length === 0) {
      reasons.push({
        code: 'GENERAL_RISK_PROFILE',
        title: 'Perfil de riesgo del crédito',
        evidence:
          'La combinación de variables del crédito y tu información registrada sugiere un nivel de riesgo mayor al deseado.',
        customerTip:
          'Puedes revisar el monto, el plazo o tu nivel de endeudamiento para buscar una mejor combinación.',
        weight: 0.5,
      });
    }
    return reasons;
  }

  private buildLetterPayload(
    app: CreditApplicationDocument,
    user: UserDocument,
  ): CreditLetterPayload {
    const decision = this.inferDecisionFromRisk(
      app.riskBand,
      app.probabilityDefault,
    );

    const reasons = this.buildReasonsFromApplication(app);

    const age = (app as any).age ?? this.computeAge(user.birthdate);

    return {
      locale: 'es-MX',
      channel: 'WEB',
      customerProfile: {
        firstName: user.firstName,
        lastName: user.lastName,
        age,
        segment: 'INDIVIDUAL',
      },
      creditSummary: {
        amount: app.amount,
        durationMonths: app.durationMonths,
        probabilityDefault: app.probabilityDefault,
        riskBand: app.riskBand,
      },
      decision,
      reasons,
      disclaimerLevel: 'STANDARD',
    };
  }

  async generateLetterForApplication(
  applicationId: string,
  userId: string,
): Promise<CreditLetter> {
  // 1) Buscar la solicitud solo por ID
  const app = await this.creditAppModel
    .findById(applicationId)
    .exec();

  if (!app) {
    throw new NotFoundException('Solicitud de crédito no encontrada');
  }

  console.log('App response:', app, 'Requested user:', userId);

  // 2) Buscar el usuario por ID (para nombre, edad, etc.)
  const user = await this.userModel.findById(userId).exec();
  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  const payload = this.buildLetterPayload(app, user);

  console.log('Generated letter payload:', payload);

  // --- STUB de carta por plantilla (igual que ya tenías) ---

  const lines: string[] = [];

  lines.push(
    `Estimado/a ${payload.customerProfile.firstName ?? 'cliente'},`,
  );
  lines.push('');
  lines.push(
    `Hemos analizado tu solicitud de crédito por ${payload.creditSummary.amount} unidades monetarias a ${payload.creditSummary.durationMonths} meses.`,
  );

  if (payload.decision === 'APPROVE') {
    lines.push(
      'Nos complace informarte que, con base en la evaluación de tu perfil y la política de riesgo vigente, tu solicitud cumple con los criterios para ser aprobada.',
    );
  } else if (payload.decision === 'REVIEW') {
    lines.push(
      'Tu solicitud requiere una revisión adicional por parte de nuestro equipo antes de tomar una decisión definitiva.',
    );
  } else {
    lines.push(
      'En este momento tu solicitud no cumple con los criterios necesarios para ser aprobada.',
    );
  }

  lines.push('');
  lines.push('Principales factores considerados:');

  const bullets: string[] = [];
  for (const r of payload.reasons.slice(0, 3)) {
    bullets.push(`• ${r.title}: ${r.evidence}`);
  }

  lines.push(...bullets);
  lines.push('');
  lines.push(
    'Te recomendamos considerar los puntos anteriores antes de presentar una nueva solicitud o ajustar el monto y plazo del crédito.',
  );
  lines.push('');
  lines.push(
    'Esta explicación es informativa y no constituye un compromiso de aprobación futura. La decisión final siempre depende de la revisión integral de tu perfil y de la política de riesgo vigente.',
  );
  lines.push('');
  lines.push('Atentamente,');
  lines.push('Equipo de Riesgo Inbursa');

  const letterText = lines.join('\n');

  const letter: CreditLetter = {
    decision: payload.decision,
    letterText,
    bullets,
    safetyFlags: [],
  };

  return letter;
}



}
