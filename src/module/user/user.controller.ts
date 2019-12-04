import { Controller, Post, Body  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }

}
