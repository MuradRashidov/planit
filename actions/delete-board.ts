'use server'
import { db } from "@/lib/db";

export async function DeleteBoard (id: string) {
    await db.board.delete({ where: {
        id
    }})
}