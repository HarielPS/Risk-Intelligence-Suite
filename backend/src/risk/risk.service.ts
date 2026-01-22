import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Model, Types } from 'mongoose';
import {
  RiskAnalysis,
  RiskAnalysisDocument,
  RiskLabel,
} from './schemas/risk-analysis.schema';
import { CreateRiskAnalysisDto } from './dto/create-risk-analysis.dto';
import { ConfigService } from '@nestjs/config';

interface MlResponse {
  probability_default: number;
  risk_band: string;
  top_features: any[];
}

@Injectable()
export class RiskService {
  private readonly mlUrl: string;

  constructor(
    @InjectModel(RiskAnalysis.name)
    private readonly riskModel: Model<RiskAnalysisDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mlUrl = this.configService.get<string>('ML_CREDIT_URL') ??
      'http://localhost:8000/score';
  }

  async analyze(dto: CreateRiskAnalysisDto): Promise<RiskAnalysis> {
    const {
      clientId,
      duration,
      creditAmount,
      age,
      status,
      creditHistory,
      purpose,
      savings,
      employmentDuration,
      installmentRate,
      personalStatusSex,
      otherDebtors,
      presentResidence,
      property,
      otherInstallmentPlans,
      housing,
      numberExistingCredits,
      job,
      peopleLiable,
      telephone,
      foreignWorker,
    } = dto;

    // 1) Diccionario EXACTO que espera score_application (FastAPI)
    const payload = {
      Duration: duration,
      CreditAmount: creditAmount,
      Age: age,
      Status: status,
      CreditHistory: creditHistory,
      Purpose: purpose,
      Savings: savings,
      EmploymentDuration: employmentDuration,
      InstallmentRate: installmentRate,
      PersonalStatusSex: personalStatusSex,
      OtherDebtors: otherDebtors,
      PresentResidence: presentResidence,
      Property: property,
      OtherInstallmentPlans: otherInstallmentPlans,
      Housing: housing,
      NumberExistingCredits: numberExistingCredits,
      Job: job,
      PeopleLiable: peopleLiable,
      Telephone: telephone,
      ForeignWorker: foreignWorker,
    };

    // 2) Llamar al microservicio Python
    const response$ = this.httpService.post<MlResponse>(this.mlUrl, payload);
    const { data: ml } = await firstValueFrom(response$);

    // 3) Normalizar banda de riesgo
    const band = ml.risk_band.toUpperCase();
    let label: RiskLabel;
    if (band === 'LOW' || band === 'MEDIUM' || band === 'HIGH') {
      label = band as RiskLabel;
    } else {
      label =
        ml.probability_default < 0.33
          ? 'LOW'
          : ml.probability_default < 0.66
          ? 'MEDIUM'
          : 'HIGH';
    }

    // 4) Guardar en Mongo
    const created = new this.riskModel({
      client: new Types.ObjectId(clientId),
      duration,
      creditAmount,
      age,
      score: ml.probability_default,
      label,
      modelVersion: 'credit_v1',
      topFeatures: ml.top_features ?? [],
    });

    return created.save();
  }

  async findOne(id: string): Promise<RiskAnalysis | null> {
    return this.riskModel.findById(id).populate('client').exec();
  }

  async findByClient(clientId: string): Promise<RiskAnalysis[]> {
    return this.riskModel
      .find({ client: clientId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findLatestByClient(clientId: string): Promise<RiskAnalysis | null> {
    return this.riskModel
      .findOne({ client: clientId })
      .sort({ createdAt: -1 })
      .populate('client')
      .exec();
  }

}
