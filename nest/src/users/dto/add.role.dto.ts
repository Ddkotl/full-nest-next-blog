import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsNotEmpty()
  @IsString({ message: 'Должна быть строка' })
  readonly value: string;
  @IsNotEmpty()
  @IsNumber({}, { message: 'Должно быть число' })
  readonly userId: number;
}
