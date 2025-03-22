import { ISchemaDefinition, IUserSchema } from '@check-me/models';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUserSchema>(
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

export const UserSchemaDefinition: ISchemaDefinition<IUserSchema> = {
  name: 'users',
  schema: UserSchema,
};
