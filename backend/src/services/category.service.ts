import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CategoryModule } from 'src/modules/category.module';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Entry, EntryDocument } from 'src/schemas/entry.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async getCategory(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category (id=${id}) was not found`);
    }
    return category;
  }

  async deleteCategory(id: string, user: UserDocument): Promise<void> {
    try {
      await this.categoryModel.findOneAndDelete({
        id: new mongoose.Types.ObjectId(id),
        ownerId: new mongoose.Types.ObjectId(user._id),
      });
      await this.entryModel.deleteMany({
        _id: new mongoose.Types.ObjectId(id),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async editCategory(
    id: string,
    user: UserDocument,
    categ: Partial<CategoryDocument>,
  ): Promise<CategoryDocument> {
    try {
      const updated = await this.categoryModel.findOneAndUpdate(
        {
          id: new mongoose.Types.ObjectId(id),
          ownerId: new mongoose.Types.ObjectId(user._id),
        },
        categ,
        {
          returnNewDocument: true,
        },
      );
      return updated;
    } catch (e) {
      console.log(e);
    }
  }
}
