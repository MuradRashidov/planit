'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {  DeleteBoard } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType):Promise<ReturnType> => {
   const { userId, orgId } = await auth();
   if (!userId || !orgId) return { error: "Unautorized error"};
   const { id } = data;
   let board;
   try {
    board = await db.board.delete({ 
        where: { id, orgId }
    })
   } catch (error) {
        return { error: "Fail to deleting board"}
   }
   revalidatePath(`/organization/${orgId}`)
   redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard,handler)