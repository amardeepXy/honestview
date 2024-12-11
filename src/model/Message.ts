import mongoose, {Schema, Document} from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document{
    content: string,
    owner: IUser,
    createdAt: Date,
    updatedAt: Date,
    views: number
}

const MessageSchema: Schema<IMessage> = new Schema({
    content: {
        type: String,
        required: [true, "Content cannot be empty"],
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"],
        validate: {
            isAsync: true,
            validator: async function (value: string) {
                const user = await mongoose.models.User.findOne({_id: value});
                if (!user) {
                    return false;
                }
            },
            message: "Owner is not valid"
        }
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const MessageModel = (mongoose.models.Message as mongoose.Model<IMessage>) || (mongoose.model<IMessage>("Message", MessageSchema));
export default MessageModel;