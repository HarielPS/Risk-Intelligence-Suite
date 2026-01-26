import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsIn,
  IsNumber,
} from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @MaxLength(64)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  secondLastName?: string;

  @IsString()
  @IsIn(["MX", "US", "CA", "OTRO"])
  country: string;

  @IsDateString({}, { message: "La fecha de nacimiento debe tener formato ISO (YYYY-MM-DD)" })
  birthdate: string;

  @IsBoolean()
  acceptTerms: boolean;

  @IsOptional()
  @IsBoolean()
  marketingOptIn?: boolean;

  //  Campos nuevos para crear el Client

  @IsOptional()          
  @IsString()
  nationalId?: string;   

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  income?: number;        
}
