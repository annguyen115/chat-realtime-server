import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatGateway } from '@/modules/chat/chat.gateway';
import { UserModule } from '@/modules/user/user.module';
import { MessageModule } from '@/modules/message/message.module';
import { User, UserSchema } from '@/modules/user/user.schema';
import { Message, MessageSchema } from '@/modules/message/message.schema';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat-app'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UserModule,
    MessageModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
