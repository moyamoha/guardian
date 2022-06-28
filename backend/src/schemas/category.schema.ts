import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Document & Category;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
