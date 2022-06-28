import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userObj: Partial<UserDocument>): Promise<UserDocument> {
    try {
      const mockUser = new this.userModel(userObj);
      await mockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      const newUser = new this.userModel({
        ...userObj,
        password: hashedPassoword,
      }) as UserDocument;
      return await newUser.save({ validateBeforeSave: false });
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
  async findOneByEmail(email: string): Promise<UserDocument> {
    return;
  }
}
