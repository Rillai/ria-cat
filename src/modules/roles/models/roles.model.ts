import { RiaApiPropertyRoleDescription, RiaApiPropertyRoleName, RiaUniqId } from '@common/wrappers/api-property.wrappers';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/models/user.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @RiaUniqId
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  public id: number;

  @RiaApiPropertyRoleName
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  public value: string;

  @RiaApiPropertyRoleDescription
  @Column({ type: DataType.STRING, allowNull: false })
  public description: string;

  @BelongsToMany(() => User, () => UserRoles)
  public users: User[];
}
