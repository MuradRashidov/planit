'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from 'zod';

export type State = {
    errors?: {
        title?: string[]; 
    };
    message?: string | null
}
const CreateBoard = z.object({
    title: z.string().min(3, { message: "min length must be 3 char"})
})
export async function create (prevState:State,formdata:FormData):Promise<State> {
    const validatedFields = CreateBoard.safeParse({
        title: formdata.get('title')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields"
        }
    }
    const { title } = validatedFields.data;
    try {
        await db.board.create({data:{
            title
        }})
    } catch (error: any) {
        console.log('DB error: ',error?.message);
    }
    revalidatePath('/organization/org_2ptdpDcpk7qCZ81bESd7c6BGAJe');
    redirect('/organization/org_2ptdpDcpk7qCZ81bESd7c6BGAJe');
}