import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/users.entity';

interface PostCreationAttr {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Название поста' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'loremloremloremloremloremloremloremloremlorem',
    description: 'Текст статьи',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({
    example: 'dima@mail.ru',
    description: 'Уникальный email',
  })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
