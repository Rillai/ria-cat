import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/models/user.model';

interface PostsCreationAttrs {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostsCreationAttrs> {
  @ApiProperty({ example: '11', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @ApiProperty({ example: 'This is an article', description: 'Post title' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public title: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet', description: 'Post content' })
  @Column({ type: DataType.STRING, allowNull: false })
  public content: string;

  @ApiProperty({ example: 'image.jpg', description: 'Post image' })
  @Column({ type: DataType.STRING })
  public image: string;

  @ApiProperty({ example: '11', description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId: number;

  @BelongsTo(() => User)
  public author: User;
}
