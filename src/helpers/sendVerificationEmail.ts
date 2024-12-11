import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { emailConstants } from "@/constants/emailConstants";

interface ISendVerificationEmailProps {
    code: string;
    userEmail: string;
    username: string;
}

export default async function sendVerificationEmail({userEmail, username, code}: ISendVerificationEmailProps): Promise<ApiResponse>{
    try {
       const emailResponse = await resend.emails.send({
            from: emailConstants.OTP_verfication_sender,
            to: userEmail,
            subject: "OTP verification",
            react: VerificationEmail({username, code})
        });
        console.log(emailResponse);
        if(emailResponse.error) return {
            success: false,
            message: "Failed to send OTP verification email"
        }
        return {
            success: true,
            message: `OTP has been sent to your email(${userEmail})`
        }
    } catch (error) {
        console.error("Failed to send OTP verification email", error);
        return {
            success: false,
            message: "Failed to send OTP verification email"
        }
    }
}