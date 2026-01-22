import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  income?: number;

  @IsOptional()
  @IsEnum(['ACTIVE', 'BLOCKED'])
  status?: 'ACTIVE' | 'BLOCKED';
}
