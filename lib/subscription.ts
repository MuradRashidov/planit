import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAYS_IN_MS = 86_400_400;

export const checkSubscription = async () => {
    const { orgId } = await auth();

    if(!orgId) return false;

    const orgSubscription = await db.orgSubscription.findUnique({
        where: { orgId },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    });

    if(!orgSubscription) return false;

    const isValid = orgSubscription.stripePriceId && orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS > Date.now();
    return !!isValid;
}