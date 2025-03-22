import { ISchemaDefinition, ITelegramUserSchema } from '@check-me/models';
import mongoose from 'mongoose';

const TelegramUserSchema = new mongoose.Schema<ITelegramUserSchema>(
  {
    userId: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    is_bot: {
      type: Boolean,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    language_code: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'telegram-users',
    timestamps: true,
  },
);

export const TelegramUserSchemaDefinition: ISchemaDefinition<ITelegramUserSchema> = {
  name: 'telegram-users',
  schema: TelegramUserSchema,
};
