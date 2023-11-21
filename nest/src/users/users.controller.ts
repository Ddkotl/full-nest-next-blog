import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUser();
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOneUser(+id);
  }

  @ApiOperation({ summary: 'Изменение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, userDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(+id);
  }

  // @ApiOkResponse({ type: SignupResponse })
  // @Post('/signup')
  // @HttpCode(HttpStatus.CREATED)
  // @Header('Content-type', 'application/json')
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @ApiBody({ type: LoginUserRequest })
  // @ApiOkResponse({ type: LoginUserResponse })
  // @Post('/login')
  // @UseGuards(LocalAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // login(@Request() req) {
  //   return { user: req.user, msg: 'Logged in' };
  // }

  // @ApiOkResponse({ type: LoginCheckResponse })
  // @Get('/login-check')
  // @UseGuards(AuthenticatedGuard)
  // loginCheck(@Request() req) {
  //   return req.user;
  // }

  // @ApiOkResponse({ type: LogoutUserResponse })
  // @Get('/logout')
  // logout(@Request() req) {
  //   req.session.destroy();
  //   return { msg: 'session has ended' };
  // }
}
