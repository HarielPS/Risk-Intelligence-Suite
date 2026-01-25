import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../auth/schemas/user.schema";
import { Client } from "../../clients/schemas/client.schema";

export type CreditApplicationDocument = CreditApplication &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class CreditApplication {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Client.name, required: false })
  client?: Types.ObjectId;

  // ===== Features derivadas =====
  @Prop()
  laufkont: number; // estado cuenta corriente (1-4)

  @Prop()
  sparkont: number; // cuenta de ahorros (1-5)

  @Prop()
  age: number; // edad calculada

  // ===== Features directas (del DTO) =====
  @Prop()
  durationMonths: number; // laufzeit

  @Prop()
  purpose: number; // verw

  @Prop()
  amount: number; // hoehe

  @Prop()
  employmentDuration: number; // beszeit

  @Prop()
  installmentRate: number; // rate

  @Prop()
  creditHistory: number; // moral

  @Prop()
  personalStatusSex: number; // famges

  @Prop()
  otherDebtors: number; // buerge

  @Prop()
  presentResidence: number; // wohnzeit

  @Prop()
  property: number; // verm

  @Prop()
  otherInstallmentPlans: number; // weitkred

  @Prop()
  housing: number; // wohn

  @Prop()
  numberCredits: number; // bishkred

  @Prop()
  job: number; // beruf

  @Prop()
  peopleLiable: number; // pers

  @Prop()
  telephone: number; // telef

  @Prop()
  foreignWorker: number; // gastarb

  // ===== Salida del modelo ML =====
  @Prop()
  probabilityDefault: number;

  @Prop()
  riskBand: "LOW" | "MEDIUM" | "HIGH";

  @Prop({
    type: [
      {
        feature: { type: String },
        impact: { type: Number },
      },
    ],
    _id: false,
  })
  topFeatures: { feature: string; impact: number }[];
}

export const CreditApplicationSchema =
  SchemaFactory.createForClass(CreditApplication);
