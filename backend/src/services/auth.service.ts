import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDocument): Promise<{ accessToken: string }> {
    user.lastLoggedIn = new Date();
    const payload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    await user.save();
    return { accessToken };
  }

  async validateUser(email: string, pass: string): Promise<UserDocument> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }
    return null;
  }

  async singup(userObj: Partial<UserDocument>) {
    await this.userService.createUser(userObj);
  }
}
