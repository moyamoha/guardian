import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailerService: MailerService,
  ) {}

  async createUser(userObj: Partial<UserDocument>): Promise<UserDocument> {
    let created: UserDocument;
    try {
      const mockUser = new this.userModel(userObj);
      await mockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      const newUser = new this.userModel({
        ...userObj,
        password: hashedPassoword,
        lastLoggedIn: null,
      }) as UserDocument;

      created = await newUser.save({ validateBeforeSave: false });
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
    await this.mailerService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: created.email,
      text: 'Welcome to Gaurdian',
      subject: 'Welcome to Gaurdian',
      html: `<p><strong>Dear ${created.firstname}!</strong><br></br>We are glad you chose Gaurdian to keep your passwords safe and secure. 
      Before you can do anything, please confirm your email address by clicking <a href="${process.env.SITE_ADDRESS}/users/confirm/?id=${created._id}">This link</a>
      <i>Team Gaurdian.</i></p>`,
    });
    return created;
  }
  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email });
  }

  async deleteUser(user: UserDocument) {
    const email = user.email;
    const deleted = await this.userModel.findOneAndDelete({ email: email });
    if (!deleted)
      throw new NotFoundException(`User with email of ${email} was not found`);
  }

  async confirmEmail(id: string): Promise<string> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }
    user.emailConfirmed = true;
    await user.save();
    return 'You are all set. Enjoy using our app.';
  }
}
