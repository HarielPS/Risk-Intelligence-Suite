import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { CreditApplicationsService } from "./credit-applications.service";
import { CreditApplicationsController } from "./credit-applications.controller";
import {
  CreditApplication,
  CreditApplicationSchema,
} from "./schemas/credit-application.schema";
import { User, UserSchema } from "../auth/schemas/user.schema";
import { Account, AccountSchema } from "../accounts/schemas/account.schema";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: CreditApplication.name, schema: CreditApplicationSchema },
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  controllers: [CreditApplicationsController],
  providers: [CreditApplicationsService],
  exports: [CreditApplicationsService],
})
export class CreditApplicationsModule {}
