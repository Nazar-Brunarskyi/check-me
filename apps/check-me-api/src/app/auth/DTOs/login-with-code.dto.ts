import { ILoginWithCodeDTO } from '@check-me/models';
import { IsNumberString, IsString, Length } from 'class-validator';

export class LoginWithCodeDTO implements ILoginWithCodeDTO {
  @IsString()
  @Length(6, 6)
  @IsNumberString()
  code: string;

  @IsString()
  authCodeId: string;
}
