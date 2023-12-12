import * as z from "zod";

export const PostValidation = z.object({
    status: z.string().min(3, "Minimum 3 characters"),
});