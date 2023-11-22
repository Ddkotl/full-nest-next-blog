import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UsersService,
    private jwtServise: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const userExistByEmail = await this.userServise.getUserByEmail(
      userDto.email,
    );
    const userExistByUsername = await this.userServise.getUserByUsername(
      userDto.username,
    );
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
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userServise.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      username: user.username,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtServise.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userServise.getUserByEmail(userDto.email);
    const passwordEquels = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquels) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
