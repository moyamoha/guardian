import { Controller, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';

import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthTokenGaurd)
  @Patch('deactivate')
  async deleteAccount(@Req() req) {
    await this.userService.deactivate(req.user);
  }

  @Get('confirm')
  async confirmEmail(@Query('id') id) {
    return await this.userService.confirmEmail(id);
  }
}
