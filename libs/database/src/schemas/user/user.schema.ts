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
    telegramInfo: {
      default: null,
      type: new mongoose.Schema(
        {
          telegramUserId: { type: Number, required: true },
          is_bot: { type: Boolean, required: true },
          first_name: { type: String, required: true },
          last_name: { type: String, required: false },
          username: { type: String, required: false },
          language_code: { type: String, required: false },
          phone_number: { type: String, required: false },
        },
        { _id: false },
      ),
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
