import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUser(@Param('email') email) {
    return this.userService.findOneByEmail(email);
  }

  @UseGuards(AuthTokenGaurd)
  @Delete('')
  async deleteAccount(@Req() req) {
    await this.userService.deleteUser(req.user);
  }
}
