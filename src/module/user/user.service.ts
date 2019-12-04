import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './dto/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) {}

  async create(person: IUser): Promise<IUser> {
    const np = new this.userModel(person);
    return await np.save();
  }

  async find(conditions: IUser): Promise<IUser> {
    const result = this.userModel.find(conditions);
    return result;
  }
}
