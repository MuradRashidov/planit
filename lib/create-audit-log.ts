import { auth, currentUser } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    action: ACTION
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = await auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error("User not found");
        }

        const { action, entityId, entityTitle, entityType } = props;
        const auditLog = await db.auditLog.create({
            data:{
                action,
                orgId,
                entityId,
                entityTitle,
                entityType,
                userId: user.id,
                userName: `${user.firstName} ${user.lastName}`,
                userImage: user.imageUrl 
            }
        })

    } catch (error) {
        console.log(`AUDIT_LOG_ERROR: ${error}`);
        
    }
}