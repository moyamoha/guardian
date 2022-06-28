import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDocument): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async singup(userObj: Partial<UserDocument>) {
    return await this.userService.createUser(userObj);
  }
}
