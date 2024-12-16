'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {   
   const { userId, orgId }  = await auth();
   if (!userId || !orgId) {
        return {
            error: 'Unauthorized'
        }
   }
   
   const canCreate = await hasAvailableCount();
   const isPro = await checkSubscription();
   console.log(`Cancreate: ${canCreate} ${isPro}`);
   
   if (!canCreate && !isPro) {
    return {
        error: "You have reached your limit of free boards, Please upgrade your plan for creating more."
    }
   }
   const { title, image } = data;
   const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
   ] = image.split('|');
   console.log({
    imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
   });
   

   if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) return { error: 'Missing fields. Fail creating board'}
   let board;

   try {
    board = await db.board.create({
        data: {
            title,
            orgId,
            imageFullUrl,
            imageId,
            imageLinkHTML,
            imageThumbUrl,
            imageUserName
        }
    });

    if(!isPro) await incrementAvailableCount(); 

    await createAuditLog({
             entityId: board.id,
             entityTitle: board.title,
             entityType: ENTITY_TYPE.BOARD,
             action: ACTION.CREATE
          });

   } catch (error) {
         return { error: "Failed to create" }
   }

   revalidatePath(`/board/${board.id}`);
   return { data: board }

}

export const createBoard = createSafeAction(CreateBoard,handler);