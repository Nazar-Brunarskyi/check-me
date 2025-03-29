import { ITokensResponseDTO } from '@check-me/models';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokensResponseDTO implements ITokensResponseDTO {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  constructor(partial: Partial<TokensResponseDTO>) {
    Object.assign(this, partial);
  }
}
