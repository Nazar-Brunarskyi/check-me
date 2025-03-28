import { ISendCodeToTelegramDto } from '@check-me/models';
import { IsPhoneNumber, IsString } from 'class-validator';

export class SendCodeToTelegramDto implements ISendCodeToTelegramDto {
  @IsString()
  @IsPhoneNumber(null)
  phoneNumber: string;
}
