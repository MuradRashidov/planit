import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ cardId: string }> }
) {
    try {
        console.log("params",params);
        
       
        const { userId, orgId } = await auth();
        if (!orgId || !userId) return new NextResponse('Unauthorized', { status: 401 });
        const { cardId } = await params;
        const card = await db.card.findUnique({
            where: {
                id: cardId,
                list: { board: { orgId } },
            },
            include: { list: { select: { title: true } } },
        });
        console.log(card?.title);
        

        if (!card) {
            return new NextResponse("Card not found", { status: 404 });
        }

        return NextResponse.json(card);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error!", { status: 500 });
    }
}
