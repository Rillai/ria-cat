import {
  RiaApiPropertyEmail,
  RiaApiPropertyIsUserBlocked,
  RiaApiPropertyPassword,
  RiaApiPropertyReasonForBlock,
  RiaUniqId,
} from '@common/wrappers/api-property.wrappers';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Post } from '../../posts/models/posts.model';
import { Role } from '../../roles/models/roles.model';
import { UserRoles } from '../../roles/models/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @RiaUniqId
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @RiaApiPropertyEmail
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public email: string;

  @RiaApiPropertyPassword
  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;

  @RiaApiPropertyIsUserBlocked
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  public blocked: boolean;

  @RiaApiPropertyReasonForBlock
  @Column({ type: DataType.STRING, allowNull: true })
  public blockReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  public roles: Role[];

  @HasMany(() => Post)
  public posts: Post[];
}
