import { IGetMeResponseDto } from '@check-me/models';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetMeResponseDto implements IGetMeResponseDto {
  @Expose()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName?: string;

  constructor(partial: Partial<GetMeResponseDto>) {
    Object.assign(this, partial);
  }
}
