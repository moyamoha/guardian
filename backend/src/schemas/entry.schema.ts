import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './category.schema';
import { User } from './user.schema';

export type EntryDocument = Document & Entry;

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

export const EntrySchema = SchemaFactory.createForClass(Entry);
