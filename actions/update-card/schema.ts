import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string(),
    description: z.optional(
        z.string({ 
            required_error: "description is required",
            invalid_type_error: "description must be string"
        }).min(3, { message: "description must be at least 3 character"}),
    ),
    title: z.optional(
        z.string({ 
            required_error: "title is required",
            invalid_type_error: "title must be string"
        }).min(3, { message: "Title must be at least 3 character"})
    ),
    id: z.string()
})