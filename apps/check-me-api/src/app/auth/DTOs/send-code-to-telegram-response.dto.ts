import { ISendCodeToTelegramResponseDTO } from '@check-me/models';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class SendCodeToTelegramResponseDTO implements ISendCodeToTelegramResponseDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  authCodeId: string;

  constructor(partial: Partial<SendCodeToTelegramResponseDTO>) {
    Object.assign(this, partial);
  }
}
