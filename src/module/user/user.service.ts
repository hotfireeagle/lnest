import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUser } from './dto/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) {}

  async createHandler(person: CreateUserDto): Promise<IUser> {
    const np = new this.userModel(person);
    return await np.save();
  }

  async loginHandler(userLoginDto: UserLoginDto): Promise<any> {
    const { name, password } = userLoginDto;
    const theNameUser = await this.find({ name });
    let status = null;
    let message = null;
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
      }
    }
    return { status, message };
  }

  async find(conditions: IUser): Promise<IUser> {
    const result = this.userModel.find(conditions);
    return result;
  }
}
