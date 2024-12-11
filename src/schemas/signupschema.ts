import {z} from "zod";

const usernameRegex = /^[a-zA-Z0-9._%+-]$/;
const usernameSchema = z.string().min(3, "Username must be at least 3 characters").regex(usernameRegex, "Username can only contain letters, numbers, and special characters");

export const signupSchema = z.object({
    username: usernameSchema,
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(50, "Password cannot be greater then 50 characters")
})