import { Module } from '@nestjs/common';
import { EntryController } from 'src/controllers/entry.controller';
import { EntryService } from 'src/services/entry.service';

@Module({
  imports: [],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
