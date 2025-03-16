import { ISchemaDefinition, IUser } from '@check-me/models';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export const UserSchemaDefinition: ISchemaDefinition<IUser> = {
  name: 'users',
  schema: UserSchema,
};
