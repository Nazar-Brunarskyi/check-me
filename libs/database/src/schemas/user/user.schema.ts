import { ISchemaDefinition, IUserSchema } from '@check-me/models';
import mongoose from 'mongoose';

const userSchemaName = 'users';

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  {
    collection: userSchemaName,
    timestamps: true,
  },
);

export const UserSchemaDefinition: ISchemaDefinition<IUserSchema> = {
  name: userSchemaName,
  schema: UserSchema,
};
