import { IGetUserResponseDto } from '@check-me/models';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserResponseDto implements IGetUserResponseDto {
  @Expose()
  username: string;

  constructor(partial: Partial<GetUserResponseDto>) {
    Object.assign(this, partial);
  }
}
