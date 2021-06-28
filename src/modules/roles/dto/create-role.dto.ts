import { RiaApiPropertyRoleDescription, RiaApiPropertyRoleName } from '@common/wrappers/api-property.wrappers';
import { RiaIsString } from '@common/wrappers/class-validator.wrappers';

export class CreateRoleDto {
  @RiaApiPropertyRoleName
  @RiaIsString
  public readonly value: string;

  @RiaApiPropertyRoleDescription
  @RiaIsString
  public readonly description: string;
}
