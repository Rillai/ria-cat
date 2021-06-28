import { RiaApiPropertyEmail, RiaApiPropertyPassword } from '@common/wrappers/api-property.wrappers';
import { RiaIsEmail, RiaIsString, RiaPasswordLength } from '@common/wrappers/class-validator.wrappers';

export class CreateUserDto {
  @RiaApiPropertyEmail
  @RiaIsEmail
  public readonly email: string;

  @RiaApiPropertyPassword
  @RiaIsString
  @RiaPasswordLength
  public readonly password: string;
}
