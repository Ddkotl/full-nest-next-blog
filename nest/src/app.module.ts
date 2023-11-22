import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/configuration';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
