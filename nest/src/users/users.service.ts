import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add.role.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private roleServise: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const userExistByEmail = await this.getUserByEmail(dto.email);
    const userExistByUsername = await this.getUserByUsername(dto.username);
    if (userExistByUsername) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userExistByEmail) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
    const role = await this.roleServise.findOneByValue('ADMIN');
    if (!role) {
      throw new HttpException(
        'Роль "ADMIN" не найдена',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.findAll({ include: { all: true } });
    return users;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException('Такого пользователя нет');
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = (await this.getOneUser(id)).update(dto);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getOneUser(id);
    user.destroy();
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleServise.findOneByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
  async banUser(dto: BunUserDto) {}

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username: username },
      include: { all: true },
    });
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }
  // findOne(filter: {
  //   where: { id?: string; username?: string; email?: string };
  // }): Promise<User> {
  //   return this.userModel.findOne({ ...filter });
  // }

  // async create(
  //   createUserDto: CreateUserDto,
  // ): Promise<User | { warningMessage: string }> {
  //   const user = new User();
  //   const existingByUserName = await this.findOne({
  //     where: { username: createUserDto.username },
  //   });
  //   const existingByEmail = await this.findOne({
  //     where: { email: createUserDto.email },
  //   });
  //   if (existingByUserName) {
  //     return { warningMessage: 'Пользователь с таким именем уже существует' };
  //   }
  //   if (existingByEmail) {
  //     return { warningMessage: 'Пользователь с таким email уже существует' };
  //   }

  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  //   user.username = createUserDto.username;
  //   user.password = hashedPassword;
  //   user.email = createUserDto.email;

  //   return user.save();
  // }
}
