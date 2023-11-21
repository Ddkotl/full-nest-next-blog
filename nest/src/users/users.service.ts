import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
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
