import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageModel } from '@/modules/message/message.schema';
import { ChatHistory } from '@/modules/chat/chat.interface';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async getHistory(): Promise<ChatHistory[]> {
    const result = await this.messageModel
      .find<MessageModel>()
      .populate('user', 'username')
      .sort({ timestamp: 1 })
      .exec();

    return result.map<ChatHistory>((msg) => ({
      id: msg._id.toString(),
      content: msg.content,
      timestamp: msg.timestamp,
      username: msg.user?.username || 'Unknown',
    }));
  }
}
