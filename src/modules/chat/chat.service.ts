import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@/modules/message/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async getHistory() {
    const result = await this.messageModel
      .find()
      .populate('user', 'username')
      .sort({ timestamp: 1 })
      .exec();

    return result.map((msg) => ({
      _id: msg._id,
      content: msg.content,
      timestamp: msg.timestamp,
      username: msg.user?.username || 'Unknown',
    }));
  }
}
