'use client'

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";


export const CardModal = () => {
const [isMounted,setIsMounted] = useState(false);
useEffect(() => {
  setIsMounted(true);
},[]);

const id = useCardModal((state) => state.id);
const isOpen = useCardModal((state) => state.isOpen);
const onOpen = useCardModal((state) => state.onOpen);
const onClose = useCardModal((state) => state.onClose);
const { data: cardData } = useQuery<CardWithList>({
  queryKey:['card', id],
  queryFn:() => fetcher(`/api/cards/${id}`),
  enabled: !!id
});

const { data: auditLogsData } = useQuery<AuditLog[]>({
  queryKey:['card-logs', id],
  queryFn:() => fetcher(`/api/cards/${id}/logs`),
  enabled: !!id
})
  return (
    <Dialog
    open={isOpen}
    onOpenChange={onClose}
    >
        <DialogContent>
           { !cardData?(<Header.Skeleton/>):( <Header data={cardData} />)}
           <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
               <DialogTitle>Asd</DialogTitle>
                <div className="col-span-3">
                      <div className="w-full space-y-6">
                      { !cardData?(<Description.Skeleton/>):( <Description data={cardData} />)}
                      </div>
                </div>
                {
                  !cardData?(
                    <Actions.Skeleton/>
                  ):(
                    <Actions data={cardData}/>
                  )
                }
                
           </div>
           {
                  !auditLogsData?(
                    <Activity.Skeleton/>
                  ):(
                    <Activity items={auditLogsData}/>
                  )
                }
        </DialogContent>
    </Dialog>
  );
};