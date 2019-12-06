import { IsString, IsNotEmpty } from 'class-validator';
import { EMPTY_NAME, EMPTY_PASSWORD, NAME_NON_STRING, PASSWORD_NON_STRING } from '../../../common/class-validate-consts';

export class UserLoginDto {
  @IsNotEmpty({ message: EMPTY_NAME })
  @IsString({ message: NAME_NON_STRING })
  readonly name: string;

  @IsNotEmpty({ message: EMPTY_PASSWORD })
  @IsString({ message: PASSWORD_NON_STRING })
  readonly password: string;
}
