import { ILoginResponseDTO } from '@check-me/models';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDTO implements ILoginResponseDTO {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
  constructor(partial: Partial<LoginResponseDTO>) {
    Object.assign(this, partial);
  }
}
