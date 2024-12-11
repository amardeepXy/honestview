import {z} from "zod";

export const messageSchema = z.object({
    content: z.string().trim().max(500, "Too long 🫤")
});