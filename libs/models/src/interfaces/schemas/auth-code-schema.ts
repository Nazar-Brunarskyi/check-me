import { IUserSchema } from './user-schema';

export interface IAuthCodeSchema {
  _id: string;
  code: string;
  phoneNumber: string;
  user: IUserSchema;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
