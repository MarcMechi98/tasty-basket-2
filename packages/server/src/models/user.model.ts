import { Schema, model, Types } from 'mongoose';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  isAdmin: boolean;
  favorites: Types.ObjectId[];
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'food' }],
}, { 
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true, 
});

export const UserModel = model<User>('user', UserSchema);
