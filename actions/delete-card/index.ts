'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {  DeleteCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType):Promise<ReturnType> => {
   const { userId, orgId } = await auth();
   if (!userId || !orgId) return { error: "Unautorized error"};
   const { id, boardId } = data;
   let cardToCopy;
   let card;
   try {
     card = await db.card.delete({
      where: { id, list: { board:  { orgId }}}
     });
   if (!card) return { error: "Card not found"};
   await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE
         })
   } catch (error) {
     return { error: "Fail to delete"}
   }
   revalidatePath(`/board/${boardId}`);
   
   return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard,handler)
