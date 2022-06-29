import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Entry, EntryDocument } from 'src/schemas/entry.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
    @InjectModel(Category.name) private categModel: Model<CategoryDocument>,
  ) {}

  async getEntries(
    user: UserDocument,
    categoryId?: string,
  ): Promise<EntryDocument[]> {
    if (categoryId)
      return await this.entryModel
        .find({
          owner: new mongoose.Types.ObjectId(user._id),
          category: new mongoose.Types.ObjectId(categoryId),
        })
        .populate('category', { name: 1 });
    else
      return await this.entryModel
        .find({
          owner: new mongoose.Types.ObjectId(user._id),
        })
        .populate('category', { name: 1 });
  }

  async getEntry(ownerId: string, id: string) {
    return await this.entryModel.findOne({
      owner: new mongoose.Types.ObjectId(ownerId),
      _id: new mongoose.Types.ObjectId(id),
    });
    // .populate('category', { name: 1 });
  }

  async createEntry(
    body: Partial<EntryDocument>,
    user: UserDocument,
    categoryId: string,
  ): Promise<EntryDocument> {
    const entry = new this.entryModel({
      ...body,
      owner: new mongoose.Types.ObjectId(user._id),
      category: new mongoose.Types.ObjectId(categoryId),
    });
    const category = await this.categModel.findOne({
      owner: new mongoose.Types.ObjectId(user._id),
      _id: new mongoose.Types.ObjectId(categoryId),
    });
    category.items.push(new mongoose.Types.ObjectId(entry._id));
    await category.save();
    return await entry.save();
  }
}
