import {  z } from "zod"


export const BookValidator = z.object({
    title: z.string().min(3, 'Title must contain atleast 3 characters!'),
    author: z.string().min(2, 'Authors name must contain atleast 3 characters'!),
    price: z.number(),
    genres: z.array(z.string()).min(1, 'You must state atleast one genre for this book!'),
    cover_image: z.string().optional(),
    file_url: z.string().optional()
})

export type TBookValidator = z.infer<typeof BookValidator>