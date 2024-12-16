"use client"

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";


export const ProModal = () => {
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: data => window.location.href = data,
    onError: err => toast.error(err)
  })
  const proModal = useProModal();
  return (
    <Dialog 
    open={proModal.isOpen}
    onOpenChange={proModal.onClose}
    >
        <DialogContent className="max-w-md p-0 overflow-hidden">
            <div className="aspect-video relative flex items-center justify-center">
                <Image
                alt="Hero"
                className="object-cover"
                src='/hero.png'
                fill
                />
            </div>
            <div className="text-neutral-700 mx-auto space-y-6 p-6">
                <DialogTitle className="sr-only">Upgrade your Planit pro plan</DialogTitle>  {/* Add DialogTitle for accessibility */}
                <h2 className="font-semibold text-xl">Upgrade your Planit pro plan</h2>
                <p className="text-neutral-600 text-xs font-semibold">
                    Explore the best of Planit
                </p>
                <div className="pl-3">
                    <ul className="text-sm list-disc">
                        <li>Unlimited boards</li>
                        <li>Advanced checklists</li>
                        <li>Admin and security features</li>
                        <li>And more!</li>
                    </ul>
                </div>
                <Button 
                className="w-full" 
                variant='primary'
                disabled={isLoading}
                onClick={() => execute({})}
                >
                    Upgrade
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}