import { checkSubscription } from "@/lib/subscription";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscription-button";

interface BillingPageProps {
  
};

const BillingPage = async({}: BillingPageProps) => {
    const isPro = await checkSubscription()
  return (
    <>
        <Info isPro={isPro}/>
        <Separator className="my-2"/>
        <SubscriptionButton isPro={isPro}/>
    </>
  );
};

export default BillingPage;