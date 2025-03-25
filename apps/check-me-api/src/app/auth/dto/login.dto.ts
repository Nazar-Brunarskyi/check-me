import { ILoginDTO } from '@check-me/models';
import { IsNumberString, IsString, Length } from 'class-validator';

export class LoginDto implements ILoginDTO {
  @IsString()
  @Length(6, 6)
  @IsNumberString()
  code: string;

  @IsString()
  authCodeId: string;
}
