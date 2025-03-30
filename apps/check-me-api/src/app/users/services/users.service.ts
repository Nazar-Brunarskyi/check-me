import { UserSchemaDefinition } from '@check-me/database';
import { IUserSchema } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetMeResponseDto } from '../DTOs/get-me-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaDefinition.name)
    private userModel: Model<IUserSchema>,
  ) {}
  async getMe(id: string) {
    const user = await this.userModel.findById(id);

    return new GetMeResponseDto(user.toObject());
  }
}
