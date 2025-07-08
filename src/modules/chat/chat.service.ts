import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@/modules/message/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  getHistory() {
    return this.messageModel
      .find()
      .populate('user', 'username')
      .sort({ timestamp: 1 })
      .exec();
  }
}
