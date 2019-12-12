import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import {
  EMPTY_NAME, EMPTY_PASSWORD, NAME_NON_STRING, PASSWORD_NON_STRING,
  NAME_SHOULD_MORE_THEN_1, NAME_SHOULD_LESS_THEN_8, PASSWORD_SHOULD_MORE_THEN_6, PASSWORD_SHOULD_LESS_THEN_12,
} from '../../../common/class-validate-consts';

export class CreateUserDto {
  @IsNotEmpty({ message: EMPTY_NAME })
  @IsString({ message: NAME_NON_STRING })
  @MinLength(1, { message: NAME_SHOULD_MORE_THEN_1 })
  @MaxLength(8, { message: NAME_SHOULD_LESS_THEN_8 })
  readonly name: string;

  @IsNotEmpty({ message: EMPTY_PASSWORD })
  @IsString({ message: PASSWORD_NON_STRING })
  @MaxLength(12, { message: PASSWORD_SHOULD_LESS_THEN_12 })
  @MinLength(6, { message: PASSWORD_SHOULD_MORE_THEN_6 })
  readonly password: string;
}
