import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, minLength: 10 })
  password: string;

  @Prop()
  lastLoggedIn: Date | null;

  @Prop({ default: false })
  emailConfirmed: false;
}

export const UserSchema = SchemaFactory.createForClass(User);
