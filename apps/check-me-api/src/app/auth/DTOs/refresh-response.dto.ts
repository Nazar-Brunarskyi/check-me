import { IRefreshResponseDTO } from '@check-me/models';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshResponseDTO implements IRefreshResponseDTO {
  @Expose()
  accessToken: string;

  constructor(partial: Partial<RefreshResponseDTO>) {
    Object.assign(this, partial);
  }
}
