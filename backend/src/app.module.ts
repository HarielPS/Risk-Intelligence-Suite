import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { AppController } from './app.controller';
import { RiskModule } from './risk/risk.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { CreditApplicationsModule } from './credit-applications/credit-applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:[
        '../infra/.env',
        '.env',
      ].filter(Boolean),
    }),

    // Conexion a Mongo usando MONGO_URI 
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');
        // console.log('MONGO_URI desde ConfigService:', uri);
        return {
          uri,
        };
      },
    }),

    ClientsModule,
    RiskModule,
    AuthModule,
    AccountsModule,
    CreditApplicationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
