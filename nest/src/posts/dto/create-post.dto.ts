import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Заголовок', description: 'Название поста' })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Содержание поста',
    description: 'Контент',
  })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть строкой' })
  readonly content: string;
  @ApiProperty({
    example: '2',
    description: 'Создатель поста',
  })
  @IsNotEmpty()
  @IsString({ message: 'Должно быть числом' })
  readonly userId: number;
}
