import { RiaApiPropertyReasonForBlock, RiaApiPropertyUserId } from '@common/wrappers/api-property.wrappers';
import { RiaIsNumber, RiaIsString } from '@common/wrappers/class-validator.wrappers';

export class BlockUserDto {
  @RiaApiPropertyUserId
  @RiaIsString
  public readonly userId: number;

  @RiaApiPropertyReasonForBlock
  @RiaIsNumber
  public readonly blockReason: string;
}
