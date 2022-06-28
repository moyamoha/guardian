import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

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
  category: ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  userId: ObjectId;
}
