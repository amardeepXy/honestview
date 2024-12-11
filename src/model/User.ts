import mongoose, {Schema, Document} from "mongoose";
import { IMessage } from "./Message";

export interface IUser extends Document{
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: IMessage[];
    isVerified: boolean;
    createdAt: Date,
    updatedAt: Date;
}

export const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Use a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
}, {timestamps: true});


const User = (mongoose.models.User as mongoose.Model<IUser>) || (mongoose.model<IUser>("User", UserSchema));
export default User;