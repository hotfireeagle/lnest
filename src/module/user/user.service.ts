import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUser } from './dto/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>, private readonly jwtService: JwtService) {}

  async createHandler(person: CreateUserDto): Promise<any> {
    let status = null;
    let message = null;
    const np = new this.userModel(person);
    const name = person.name;                                        // 这是用户名，用户名应该是唯一的
    const users = await this.find({ name });                               // 找出来的结果
    if (users && users.length) {
      status = 2;
      message = '已存在该用户';
    } else {
      await np.save();
      status = 1;
      message = '创建成功';
    }
    return { status, message };
  }

  async loginHandler(userLoginDto: UserLoginDto): Promise<any> {
    const { name, password } = userLoginDto;
    const theNameUser = await this.find({ name });
    let status = null;                                              // 请求状态码
    let message = null;                                             // 请求处理信息
    let obj = null;                                                 // 查询到有用数据
    if (!theNameUser) {
      status = 2;
      message = '不存在此用户';
    } else {
      const user = theNameUser[0];
      if (user.password !== password) {
        status = 2;
        message = '密码不符';
      } else {
        status = 1;
        const token = this.jwtService.sign({ username: user.name, sub: user._id });
        obj = { token, name: user.name, _id: user._id };
      }
    }
    return { status, message, obj };
  }

  async find(conditions?: IUser): Promise<IUser[]> {
    const result = this.userModel.find(conditions);
    return result;
  }
}
