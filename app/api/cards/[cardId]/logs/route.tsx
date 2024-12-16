// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { ENTITY_TYPE } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest, {params}: { params: { cardId: string}}) {
//     try {
//         const { orgId, userId } = await auth();
//         if(!userId || !orgId) return new NextResponse("Unauthorized",{ status: 401 });
//         const auditLogs = await  db.auditLog.findMany({
//             where: {
//                 entityId: params.cardId,
//                 entityType: ENTITY_TYPE.CARD
//             },
//             orderBy: {
//                 createdAt: "desc"
//             },
//             take: 3
//         });
//         return NextResponse.json(auditLogs);
//     } catch (error) {
//         return new NextResponse("Inteernal error",{ status: 500 });

//     }
// }

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { cardId: string }}) {
    try {
        const { orgId, userId } = await auth();
        if (!userId || !orgId) return new NextResponse("Unauthorized", { status: 401 });

        const auditLogs = await db.auditLog.findMany({
            where: {
                entityId: params.cardId, // params'i burada context üzerinden alıyoruz
                entityType: ENTITY_TYPE.CARD
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        });

        return NextResponse.json(auditLogs);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
