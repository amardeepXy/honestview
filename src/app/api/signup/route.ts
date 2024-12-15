import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";

import { validateUserInput } from "@/validators/userSignInUpValidator";
import {generateOtp} from "@/utils/generateOtp";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export async function POST(request: Request): Promise<Response>{
    await dbConnect();
    try {
        const {username, email, password} = await request.json();

        // Validate username's, email's and password's pattern
        const validationResult = validateUserInput(username, email, password);
        if(!validationResult.isValid){
           return Response.json({
                success: false,
                message: validationResult.message
            }, {status: 400});
        }

        const existingUserWithUsername = await User.findOne({username});
        if(existingUserWithUsername?.isVerified) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 409});
        }

        const existingUserWithEmail = await User.findOne({email});
        if(existingUserWithEmail?.isVerified) {
            return Response.json({
                success: false,
                message: "This email is already used"
            })
        }

        if(existingUserWithUsername && !existingUserWithEmail){
            console.log("deleted usre");
            await User.deleteOne({username: existingUserWithUsername.username});
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const otp = generateOtp(6);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        // update user info if there is already with the given email 
        if(existingUserWithEmail){
            existingUserWithEmail.username = username;
            existingUserWithEmail.password = hashedPassword;
            existingUserWithEmail.verifyCode = otp;
            existingUserWithEmail.verifyCodeExpiry = expiryDate;
            await existingUserWithEmail.save();
        }
        // create new user if there not already with the given email
        else{

            await User.create({
                username,
                email,
                password: hashedPassword,
                verifyCodeExpiry: expiryDate,
                verifyCode: otp
            });
        }

        // send OTP code to to user's email
        const emailResponse = await sendVerificationEmail({userEmail: email, username, code: otp});

        if(!emailResponse.success){
            return Response.json({success: false, message: emailResponse.message}, {status: 500});
        }
        return Response.json({success: true, message: "OTP has been sent to your email"}, {status: 201});
        
    } catch (error) {
        console.error("signup Failed to create user", error);
        return Response.json({success: false, message: "Failed to register user because of server error"}, {status: 500});
    }
}