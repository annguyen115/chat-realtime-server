import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/modules/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(username: string) {
    let user = await this.userModel.findOne({ username });
    if (!user) {
      user = await this.userModel.create({ username });
    }

    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user._id,
        username: user.username,
      },
    };
  }
}
