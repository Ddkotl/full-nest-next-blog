import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Dima', description: 'Уникальное имя пользователя' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'dima@mail.ru',
    description: 'Уникальный email',
  })
  @IsNotEmpty()
  readonly email: string;
}
