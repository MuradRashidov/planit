'use client'

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";


interface ListOptionsProps {
   data: List;
   onAddCard: () => void;
};

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { execute: executeDelete } = useAction(deleteList, {
     onSuccess: (data) => {
        toast.success(`${data.title} deleted`);
        closeRef.current?.click();
     },
     onError: (err) => {
        toast.error(err)
     }
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
       toast.success(`${data.title} copied`);
       closeRef.current?.click();
    },
    onError: (err) => {
       toast.error(err)
    }
 });
  const handleDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    executeDelete({
        id,
        boardId
    })
  }
  const handleCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    executeCopy({
        id,
        boardId
    })
  }
  const closeRef = useRef<ElementRef<'button'>>(null);
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button className="h-auto w-auto p-2" variant='ghost'>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 py-3" side="bottom" align="start">
            <div className="text-sm font-medium text-center to-neutral-600">
                List Actions
            </div>
            <PopoverClose ref={closeRef} asChild>
                <X className="h-auto w-auto p-2 absolute right-2 top-2 text-neutral-600"/>
            </PopoverClose>
            <Button
            onClick={onAddCard}
            variant='ghost'
            className="rounded-none p-2 px-5 font-medium text-sm justify-start w-full h-auto"
            >
                Add a Card
            </Button>
            <form action={handleCopy}>
                <input id="id" hidden name="id" value={data.id} />
                <input id="boardId" hidden name="boardId" value={data.boardId} />
                <FormSubmit 
                variant="ghost"
                className="rounded-none p-2 px-5 font-medium text-sm justify-start w-full h-auto"
                >
                    Copy List...
                </FormSubmit>
            </form>
            <Separator/>
            <form action={handleDelete}>
                <input id="id" hidden name="id" value={data.id} />
                <input id="boardId" hidden name="boardId" value={data.boardId} />
                <FormSubmit 
                variant="ghost"
                className="rounded-none p-2 px-5 font-medium text-sm justify-start w-full h-auto"
                >
                    Delete this List
                </FormSubmit>
            </form>
        </PopoverContent>
    </Popover>
  );
};