import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @HttpCode(201)
  async login() {
    return;
  }
}
