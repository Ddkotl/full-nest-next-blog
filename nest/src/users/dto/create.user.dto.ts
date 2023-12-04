import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Уникальное имя пользователя' })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  readonly username: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль',
  })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({
    example: 'dima@mail.ru',
    description: 'Уникальный email',
  })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
