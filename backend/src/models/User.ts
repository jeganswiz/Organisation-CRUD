import mongoose, { Schema, Document, Date } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phoneNumber: string;
    role: string;
    dob: Date;
    refreshToken: string;
    isLogin: boolean;
}

const userSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dob: { type: String, required: true },
    role: { type: String, default: 'user' },
    refreshToken: { type: String,  },
    isLogin: {type: Boolean, }

});

export const User = mongoose.model<IUser>('User', userSchema);
