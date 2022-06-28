import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Entry, EntryDocument } from 'src/schemas/entry.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async getEntries(user: UserDocument): Promise<EntryDocument[]> {
    const entries = await this.entryModel.find({
      owner: new mongoose.Types.ObjectId(user._id),
    });
    if (!entries) {
      throw new NotFoundException('No entries found');
    }
    return entries;
  }
}
