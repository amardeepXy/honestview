import {IMessage} from "@/model/Message";

export interface ApiResponse{
    success: boolean;
    message: string;
    messages?: Array<IMessage>;
    isAcceptingMessage?: boolean;
}