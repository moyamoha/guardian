import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getUser(): string {
    return this.appService.getHello();
  }
}
