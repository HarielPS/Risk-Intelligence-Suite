import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RiskAnalysisDocument = RiskAnalysis & Document;
export type RiskLabel = 'LOW' | 'MEDIUM' | 'HIGH';

@Schema({ timestamps: true })
export class RiskAnalysis {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: Types.ObjectId;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  creditAmount: number;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  score: number; // probability_default

  @Prop({ required: true })
  label: RiskLabel; // risk_band

  @Prop({ default: 'credit_v1' })
  modelVersion: string;

  @Prop({ type: Array, default: [] })
  topFeatures: any[];
}

export const RiskAnalysisSchema = SchemaFactory.createForClass(RiskAnalysis);
