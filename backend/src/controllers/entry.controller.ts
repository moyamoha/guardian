import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthTokenGaurd } from 'src/config/auth-token.gaurd';
import { EntryService } from 'src/services/entry.service';

@Controller('entries')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @UseGuards(AuthTokenGaurd)
  @Get('')
  async getEntries(@Req() req) {
    await this.entryService.getEntries(req.user);
  }
}
