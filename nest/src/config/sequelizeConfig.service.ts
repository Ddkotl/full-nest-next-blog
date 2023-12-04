import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { Post } from 'src/posts/entities/post.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserRole } from 'src/roles/entities/user-role.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      sql: { dialect, logging, host, port, username, password, database },
    } = this.configService.get('database');
    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User, Role, UserRole, Post],
      autoLoadModels: true,
      synchronize: true,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    };
  }
}
