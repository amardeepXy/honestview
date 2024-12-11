import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request){
    try {
        const {username, email, password} = await request.json();
        
    } catch (error) {
        console.error("signup Failed to create user", error);
        return Response.json({success: false, message: "Failed to create user"}, {status: 500});
    }
}