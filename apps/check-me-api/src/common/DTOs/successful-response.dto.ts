import { ISuccessfulResponseDto } from '@check-me/models';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SuccessfulResponseDto implements ISuccessfulResponseDto {
  @Expose()
  success: boolean;

  constructor(partial: Partial<SuccessfulResponseDto>) {
    Object.assign(this, partial);
  }
}
