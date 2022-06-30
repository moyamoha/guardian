import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  Verification,
  VerificationDocument,
} from 'src/schemas/verification.schema';
import {
  mfaDisabledEmailResp,
  accountDeactivedEmailResp,
  accountDeletedEmailResp,
  mfaEnabledEmailResp,
} from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Verification.name)
    private verifModel: Model<VerificationDocument>,
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
    const confirmationLink = `${process.env.SITE_ADDRESS}/users/confirm/?id=${created._id}`;
    await this.mailerService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: created.email,
      text: 'Welcome to Gaurdian',
      subject: 'Welcome to Gaurdian',
      html: `<p><strong>Dear ${created.firstname}!</strong><br></br>We are glad you chose Gaurdian to keep your passwords safe and secure. 
      Before you can do anything, please confirm your email address by clicking <a href="${confirmationLink}">This link</a>
      <br></br><i>Team Gaurdian.</i></p>`,
    });
    return created;
  }
  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email });
  }

  async deactivate(user: UserDocument) {
    try {
      user.isActive = false;
      await this.mailerService.sendMail({
        from: process.env.EMAIL_SENDER,
        to: user.email,
        subject: 'Your account is DEACTIVATED',
        html: `<p><strong>Dear ${user.firstname}!</strong><br></br>${accountDeactivedEmailResp}
        <br></br><i>Team Gaurdian.</i></p>`,
      });
      await user.save();
    } catch (e) {}
  }

  async deleteAccount(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    await this.mailerService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: user.email,
      subject: 'Your account was DELETED',
      html: `<p><strong>Dear ${user.firstname}!</strong><br></br>${accountDeletedEmailResp}
      <br></br><i>Team Gaurdian.</i></p>`,
    });
  }

  async confirmEmail(id: string): Promise<string> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }
    user.emailConfirmed = true;
    await user.save();
    return 'You are all set. Enjoy using our application ❤️';
  }

  async getInActives(): Promise<UserDocument[]> {
    return await this.userModel.find({ isActive: false });
  }

  async changeMfaState(id: string, mfaEnabled: boolean): Promise<UserDocument> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(
        id,
        { mfaEnabled: mfaEnabled },
        { returnDocument: 'after' },
      );
      const bodyText = mfaEnabled ? mfaEnabledEmailResp : mfaDisabledEmailResp;
      await this.mailerService.sendMail({
        from: process.env.EMAIL_SENDER,
        to: updated.email,
        subject: mfaEnabled
          ? 'Your account is now SECURE'
          : 'Oops! your account is VULNERABLE',
        html: `<p><strong>Dear ${updated.firstname}!</strong><br></br>${bodyText}
        <br></br><i>Team Gaurdian.</i></p>`,
      });
      if (mfaEnabled) {
        const verification = new this.verifModel({
          user: new mongoose.Types.ObjectId(updated._id),
        });
        await verification.save();
      } else {
        await this.verifModel.findOneAndDelete({
          user: new mongoose.Types.ObjectId(updated._id),
        });
      }
      return updated;
    } catch (e) {
      throw new BadRequestException('Could not update user');
    }
  }

  async getUserById(id: string | mongoose.Types.ObjectId): Promise<any> {
    return await this.userModel.findById(id);
  }
}
