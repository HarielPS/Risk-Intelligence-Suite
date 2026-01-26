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
import { MlLetterPayload } from "./types/ml-letter.types";
import { Client, ClientDocument } from "../clients/schemas/client.schema";



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
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
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
      Status: laufkont,                        //  laufkont
      Duration: dto.durationMonths,           //  laufzeit
      CreditHistory: dto.creditHistory,       //  moral
      Purpose: dto.purpose,                   //  verw
      CreditAmount: dto.amount,               //  hoehe
      Savings: sparkont,                      //  sparkont
      EmploymentDuration: dto.employmentDuration, //  beszeit
      InstallmentRate: dto.installmentRate,   //  rate
      PersonalStatusSex: dto.personalStatusSex,   //  famges
      OtherDebtors: dto.otherDebtors,         //  buerge
      PresentResidence: dto.presentResidence, //  wohnzeit
      Property: dto.property,                 //  verm
      Age: age,                               //  alter
      OtherInstallmentPlans: dto.otherInstallmentPlans, //  weitkred
      Housing: dto.housing,                   //  wohn
      NumberExistingCredits: dto.numberCredits,     //  bishkred
      Job: dto.job,                           //  beruf
      PeopleLiable: dto.peopleLiable,         //  pers
      Telephone: dto.telephone,               //  telef
      ForeignWorker: dto.foreignWorker,       //  gastarb
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

    console.log("Saved credit application:", saved);

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

async generateLetterForApplication(
  applicationId: string,
  userId: string,
): Promise<CreditLetter> {
  const app = await this.creditAppModel.findById(applicationId).exec();
  if (!app) {
    throw new NotFoundException("Solicitud de crédito no encontrada");
  }

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

  const client = await this.clientModel
    .findOne({ email: user.email })
    .exec();

  if (!client) {
    throw new NotFoundException("Cliente asociado no encontrado");
  }

  //Armar el payload para el microservicio ml-letter
  const mlLetterPayload: MlLetterPayload = {
    application: {
      id: app._id.toString(),
      probabilityDefault: app.probabilityDefault,
      riskBand: app.riskBand,
      topFeatures: Array.isArray(app.topFeatures) ? app.topFeatures : [],
      createdAt: app.createdAt,
      amount: app.amount,
      durationMonths: app.durationMonths,
    },
    customer: {
      id: client._id.toString(),
      name: client.name,
      nationalId: client.nationalId,
      email: client.email,
      phone: client.phone ?? "",
      income: client.income ?? 0,
      status: client.status ?? "ACTIVE",
      createdAt: client.createdAt,
    },
  };

  console.log(
    "ML Letter Payload:",
    JSON.stringify(mlLetterPayload, null, 2),
  );

  const mlLetterUrl =
    this.configService.get<string>("ML_LETTER_URL") ?? "";

  if (!mlLetterUrl) {
    throw new InternalServerErrorException(
      "ML_LETTER_URL no está configurado",
    );
  }

  const callLetterApi = async () => {
    const resp$ = this.http.post(mlLetterUrl, mlLetterPayload);
    return await firstValueFrom(resp$);
  };

  // Llamar al microservicio ml-letter con retry
  try {
    let resp;

    try {
      resp = await callLetterApi();
    } catch (err: any) {
      const code = err?.code ?? err?.cause?.code;
      if (code === "ECONNREFUSED") {
        console.warn(
          "Primer intento a letter-api falló con ECONNREFUSED, reintentando en 2s...",
        );
        await new Promise((r) => setTimeout(r, 2000));
        resp = await callLetterApi();
      } else {
        throw err;
      }
    }

    const raw = resp.data as any;
    console.log("Respuesta de ml-letter:", JSON.stringify(raw, null, 2));

    let bullets: string[] = [];

    if (Array.isArray(raw.bullets) && raw.bullets.length > 0) {
      bullets = raw.bullets;
    } else {
      (raw.positiveFactors ?? []).forEach((f: any) => {
        bullets.push(
          `Factor positivo: ${f.value_label} — ${f.impact_text}`,
        );
      });

      (raw.riskFactors ?? []).forEach((f: any) => {
        bullets.push(
          `Factor de riesgo: ${f.value_label} — ${f.impact_text}`,
        );
      });
    }

    const letter: CreditLetter = {
      decision: raw.decision as ExplainabilityDecision,
      letterText:
        raw.letterText ??
        raw.reason ??
        "No se pudo generar una explicación detallada.",
      bullets,
      safetyFlags: raw.safetyFlags ?? [],
    };

    return letter;

  } catch (err) {
    console.error("Error al llamar al microservicio de cartas:", err);
    throw new InternalServerErrorException(
      "Error al llamar al microservicio de cartas",
    );
  }
}


}