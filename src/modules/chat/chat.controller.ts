import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ChatHistory } from '@/modules/chat/chat.interface';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Get message history' })
  @ApiResponse({ status: 200, type: [ChatHistory] })
  @Get('history')
  async getMessageHistory(): Promise<ChatHistory[]> {
    return this.chatService.getHistory();
  }
}
