import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../auth/schemas/user.schema";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  currentAccountBalance: number; // cuenta corriente

  @Prop({ type: Number, default: 0 })
  savingsAccountBalance: number; // cuenta de ahorros
}

export const AccountSchema = SchemaFactory.createForClass(Account);
