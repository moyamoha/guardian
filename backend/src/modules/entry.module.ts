import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryController } from 'src/controllers/entry.controller';
import { Entry, EntrySchema } from 'src/schemas/entry.schema';
import { EntryService } from 'src/services/entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
