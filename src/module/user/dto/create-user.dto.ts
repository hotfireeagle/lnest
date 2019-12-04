import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;

  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码必须非空' })
  readonly password: string;
}
