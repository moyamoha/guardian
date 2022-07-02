import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { UserService } from 'src/services/user.service';
import { CustomReq } from 'src/types/custom';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthTokenGaurd)
  @Patch('deactivate')
  async deleteAccount(@Req() req: CustomReq) {
    await this.userService.deactivate(req.user);
  }

  @UseGuards(AuthTokenGaurd)
  @Patch('toggle-mfa')
  async toggleMfa(@Req() req: CustomReq, @Body('mfaEnabled') mfaEnabled) {
    const updated = await this.userService.changeMfaState(
      req.user._id,
      mfaEnabled,
    );
    return {
      email: updated.email,
      firstname: updated.firstname,
      lastname: updated.lastname,
      mfaEnabled: updated.mfaEnabled,
    };
  }

  @Get('confirm')
  async confirmEmail(@Query('id') id) {
    await this.userService.confirmEmail(id);
  }
}
