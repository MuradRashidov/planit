import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({ 
        required_error: "title is required",
        invalid_type_error: "title must be string"
    }).min(3, { message: "Title must be at least 3 character"}),
    image: z.string({
        required_error:"image is required",
        invalid_type_error:"image must be string"
    })
})