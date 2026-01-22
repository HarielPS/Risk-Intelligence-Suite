import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  nationalId: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  income?: number;

  @Prop({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'BLOCKED';
}

export const ClientSchema = SchemaFactory.createForClass(Client);
