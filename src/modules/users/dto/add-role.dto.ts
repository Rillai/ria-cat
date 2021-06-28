import { RiaApiPropertyRoleName, RiaApiPropertyUserId } from '@common/wrappers/api-property.wrappers';
import { RiaIsNumber, RiaIsString } from '@common/wrappers/class-validator.wrappers';

export class AddRoleDto {
  @RiaApiPropertyUserId
  @RiaIsNumber
  public readonly userId: number;

  @RiaApiPropertyRoleName
  @RiaIsString
  public readonly value: string;
}
