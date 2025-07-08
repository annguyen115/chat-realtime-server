import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@/modules/user/user.schema';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageModel = Message & { _id: Types.ObjectId };
