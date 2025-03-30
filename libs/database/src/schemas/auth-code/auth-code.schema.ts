import { IAuthCodeSchema, ISchemaDefinition } from '@check-me/models';
import mongoose from 'mongoose';
import { UserSchemaDefinition } from '../user';

const authCodeSchemaName = 'auth-codes';

const AuthCodeSchema = new mongoose.Schema<IAuthCodeSchema>(
  {
    code: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserSchemaDefinition.name,
      required: true,
    },

    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    collection: authCodeSchemaName,
    timestamps: true,
  },
);

export const AuthCodeSchemaDefinition: ISchemaDefinition<IAuthCodeSchema> = {
  name: authCodeSchemaName,
  schema: AuthCodeSchema,
};
