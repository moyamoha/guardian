import { Controller, Get } from '@nestjs/common';
import { EntryService } from 'src/services/entry.service';

@Controller('entry')
export class EntryController {
  constructor(private entryService: EntryService) {}

  @Get('')
  async getEntries() {
    return '12';
  }
}
