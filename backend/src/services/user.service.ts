import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  async findOneByEmail(email: string): Promise<UserDocument> {
    return;
  }
}
