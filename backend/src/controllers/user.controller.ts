import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthTokenGaurd)
  @Delete('')
  async deleteAccount(@Req() req) {
    try {
      await this.userService.deleteUser(req.user);
    } catch (e) {
      throw new NotFoundException(e, e.message);
    }
  }
}
