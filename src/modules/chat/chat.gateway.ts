import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/modules/user/user.schema';
import { Message } from '@/modules/message/message.schema';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // CORS chỉ frontend
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() payload: { username: string; content: string },
  ) {
    const { username, content } = payload;

    let user = await this.userModel.findOne({ username });

    if (!user) {
      user = await this.userModel.create({ username });
    }

    const message = await this.messageModel.create({
      content,
      timestamp: new Date(),
      user: user._id,
    });

    this.server.emit('receive_message', {
      username: user.username,
      content,
      timestamp: message.timestamp,
    });
  }
}
