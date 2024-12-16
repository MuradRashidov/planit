'use client'

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList
};

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopy, isLoading: isLoadingCardCopy } = useAction(copyCard,{
    onSuccess: (data) => {
      toast.success(`${data.title} copied`);
      cardModal.onClose();
    },
    onError: (err) => toast.error(err)
  });
  
    const { execute: executeDelete, isLoading: isLoadingCardDelete } = useAction(deleteCard,{
      onSuccess: (data) => {
        toast.success(`${data.title} deleted`);
        cardModal.onClose();
      },
      onError: (err) => toast.error(err)
    });
    const onCopy = () => {
      executeCopy({boardId:params.boardId as string,id:data.id})
    }
    const onDelete = () => {
      executeDelete({boardId:params.boardId as string,id:data.id})
    }
  return (
    <div className="space-y-2 mt-2">
        <p className="font-semibold text-sm">

        </p>
        <Button 
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCardCopy}
        >
            <Copy className="h-4 w-4 m-2"/>
            Copy
        </Button>
        <Button 
        disabled={isLoadingCardDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
        onClick={onDelete}
        >
            <Trash className="h-4 w-4 m-2"/>
            Delete
        </Button>
    </div>
  );
};

Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="skew-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
        </div>
    )
}