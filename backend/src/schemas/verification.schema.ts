import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VerificationDocument = Document & Verification;

@Schema()
export class Verification {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ default: 0 })
  code: number;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
