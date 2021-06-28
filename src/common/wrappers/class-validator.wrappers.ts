import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

import {
  INVALID_EMAIL,
  MUST_BE_NUMBER,
  MUST_BE_STRING,
  PASSWORD_LENGTH_MAX,
  PASSWORD_LENGTH_MIN,
  PASSWORD_MUST_CONTAIN,
} from '../../app-constants';

export const RiaIsString = IsString({ message: MUST_BE_STRING });
export const RiaIsEmail = IsEmail({}, { message: INVALID_EMAIL });
export const RiaIsNumber = IsNumber({}, { message: MUST_BE_NUMBER });

export const RiaPasswordLength = Length(PASSWORD_LENGTH_MIN, PASSWORD_LENGTH_MAX, { message: PASSWORD_MUST_CONTAIN });
