import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Dima' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'Dima123' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'Dima@mail.ru' })
  @IsNotEmpty()
  readonly email: string;
}
