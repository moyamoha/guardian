import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type CategoryDocument = Document & Category;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Entry' })
  items: [mongoose.Types.ObjectId];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
