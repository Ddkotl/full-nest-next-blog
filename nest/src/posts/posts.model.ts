import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  images: string;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;
}
