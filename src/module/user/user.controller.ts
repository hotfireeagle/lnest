import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  async register(@Body() body) {
    const result = await this.userService.create(body);
    return result;
  }
}
