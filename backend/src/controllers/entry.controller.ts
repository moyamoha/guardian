import { Controller, Get } from '@nestjs/common';
import { EntryService } from 'src/services/entry.service';

@Controller()
export class EntryController {
  constructor(private passService: EntryService) {}

  @Get('')
  async getPassword() {
    return '12';
  }
}
