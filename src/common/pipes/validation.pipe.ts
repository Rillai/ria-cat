import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { ValidationException } from '../exeptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(obj);

    if (errors.length) {
      const messages:string[] = errors.map((err: ValidationError) => `${err.property} - ${Object.values(err.constraints).join(', ')}`);
      throw new ValidationException(messages);
    }
  }
}
