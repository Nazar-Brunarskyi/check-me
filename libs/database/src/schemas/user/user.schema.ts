import { ISchemaDefinition, ITelegramInfo, IUserSchema } from '@check-me/models';
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

    phoneNumber: {
      type: String,
      required: false,
    },

    telegramInfo: {
      default: null,
      type: new mongoose.Schema<ITelegramInfo>(
        {
          telegramUserId: { type: Number, required: true },
          is_bot: { type: Boolean, required: true },
          username: { type: String, required: false },
          language_code: { type: String, required: false },
          chat_id: { type: Number, required: true },
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
