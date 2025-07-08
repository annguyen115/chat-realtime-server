import { ApiProperty } from '@nestjs/swagger';

export class ChatHistory {
  @ApiProperty({
    type: String,
    description: 'History message id',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'History message content',
  })
  content: string;

  @ApiProperty({
    type: Date,
    description: 'History message date',
  })
  timestamp: Date;

  @ApiProperty({
    type: String,
    description: 'Username',
  })
  username: string;
}
