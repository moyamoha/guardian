import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Entry, EntryDocument } from 'src/schemas/entry.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async getAll(ownerId: string): Promise<CategoryDocument[]> {
    return await this.categoryModel
      .find({
        owner: new mongoose.Types.ObjectId(ownerId),
      })
      .populate('items');
  }

  async creatCategory(
    data: Partial<CategoryDocument>,
    user: UserDocument,
  ): Promise<CategoryDocument> {
    const category = new this.categoryModel({
      ...data,
      owner: new mongoose.Types.ObjectId(user._id),
    });
    return await category.save();
  }

  async getCategory(id: string, ownerId: string): Promise<CategoryDocument> {
    const category = await this.categoryModel
      .findOne({
        owner: new mongoose.Types.ObjectId(ownerId),
        _id: new mongoose.Types.ObjectId(id),
      })
      .populate('items');
    if (!category) {
      throw new NotFoundException(`Category (id=${id}) was not found`);
    }
    return category;
  }

  async deleteCategory(id: string, ownerId: string): Promise<void> {
    const categoryBeforeDeletion = await this.categoryModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      ownerId: new mongoose.Types.ObjectId(ownerId),
    });
    if (!categoryBeforeDeletion) {
      throw new NotFoundException(`Category ${id} was not found`);
    }
    await this.entryModel.deleteMany({
      category: new mongoose.Types.ObjectId(categoryBeforeDeletion._id),
      owner: new mongoose.Types.ObjectId(ownerId),
    });
  }

  async editCategory(
    id: string,
    ownerId: string,
    categ: Partial<CategoryDocument>,
  ): Promise<CategoryDocument> {
    const updated = await this.categoryModel
      .findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
          owner: new mongoose.Types.ObjectId(ownerId),
        },
        categ,
        {
          returnDocument: 'after',
        },
      )
      .populate('items');
    if (!updated) {
      throw new NotFoundException(`Category ${id} was not found`);
    }
    return updated;
  }
}
