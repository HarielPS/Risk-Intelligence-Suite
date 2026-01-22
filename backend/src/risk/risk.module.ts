import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';
import { RiskAnalysis, RiskAnalysisSchema } from './schemas/risk-analysis.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: RiskAnalysis.name, schema: RiskAnalysisSchema },
    ]),
  ],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
