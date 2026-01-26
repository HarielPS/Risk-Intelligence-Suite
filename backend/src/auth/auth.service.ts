import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { User, UserDocument, UserRole } from "./schemas/user.schema";
import { Account, AccountDocument } from "../accounts/schemas/account.schema";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ClientsService } from "../clients/clients.service";
import { CreateClientDto } from "../clients/dto/create-client.dto";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly clientsService: ClientsService,
  ) {}

  async register(dto: RegisterUserDto) {
    const existing = await this.userModel.findOne({ email: dto.email }).exec();
    if (existing) {
      throw new ConflictException("El correo ya está registrado");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = new this.userModel({
      email: dto.email,
      passwordHash,
      role: UserRole.CLIENT,
      firstName: dto.firstName,
      lastName: dto.lastName,
      secondLastName: dto.secondLastName,
      country: dto.country,
      birthdate: dto.birthdate,
    });

    const savedUser = await user.save();

    const account = new this.accountModel({
      user: savedUser._id,
      currentAccountBalance: 0,
      savingsAccountBalance: 0,
    });

    await account.save();

    const clientPayload: CreateClientDto = {
      name: `${dto.firstName} ${dto.lastName}`,
      nationalId: dto.nationalId ?? 'PENDIENTE',
      email: dto.email,
      phone: dto.phone,
      income: dto.income ?? 0,
    };
    const client = await this.clientsService.create(clientPayload);


    return {
      id: savedUser._id,
      email: savedUser.email,
      role: savedUser.role,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      clientId: client._id,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
