import { RiaApiPropertyUserId } from '@common/wrappers/api-property.wrappers';
import { RiaIsNumber, RiaIsString } from '@common/wrappers/class-validator.wrappers';

export class CreatePostDto {
  @RiaIsString
  public readonly title: string;

  @RiaIsString
  public readonly content: string;

  @RiaIsString
  public readonly image: string;

  @RiaApiPropertyUserId
  @RiaIsNumber
  public readonly userId: number;
}
