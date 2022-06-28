import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './category.schema';
import { User } from './user.schema';

@Schema()
export class Entry {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  url: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  owner: User;
}
