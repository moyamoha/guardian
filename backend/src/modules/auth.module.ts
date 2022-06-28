import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
