import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export enum UserRole {
  CLIENT = "CLIENT",
  EXECUTIVE = "EXECUTIVE",
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  secondLastName?: string;

  @Prop()
  country: string;

  @Prop()
  birthdate: string; // ISO string (YYYY-MM-DD)
}

export const UserSchema = SchemaFactory.createForClass(User);
