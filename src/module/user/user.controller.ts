import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createHandler(createUserDto);
    return result;
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const response = await this.userService.loginHandler(userLoginDto);
    return response;
  }

  @UseGuards(AuthGuard())
  @Get('all')
  async getAll() {
    return this.userService.find();
  }

}
