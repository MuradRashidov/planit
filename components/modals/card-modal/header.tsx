'use client'

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList | undefined;
};

export const Header = ({ data }: HeaderProps) => {
  const [title,setTitle] = useState(data?.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { execute } = useAction(updateCard,{
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey:['card',data.id]
      });
      queryClient.invalidateQueries({
        queryKey:['card-logs',data.id]
      });
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title)
    },
    onError: (err) => toast.error(err)
  })
  
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const handleSubmit = (formData:FormData) => {
      const title = formData.get('title') as string;
      const boardId = params.boardId as string;
      const id = data?.id as string;
      
      if(data?.title === title) return;

      execute({ boardId, id, title});

  }
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="w-5 h-5 mt-1 text-neutral-700"/>
        <div className="w-full">
            <form action={handleSubmit}>
               <FormInput 
               ref={inputRef}
               onBlur={onBlur}
               className="font-semibold text-xl px-1 text-neutral-700 bg-transparent 
               border-transparent relative -left-[-1.5] w-[95%] focus-visible:bg-white focus-visible:border-input truncate"
               id="title" 
               defaultValue={title}
               />
            </form>
            <p className="text-sm text-muted-foreground">in list <span className="underline">{data?.list.title}</span></p>
        </div>
    </div>
  );
};

Header.Skeleton = function HeaderSceleton(){
    return (
        <div className="flex items-center mb-6 gap-x-3">
            <Skeleton className="w-6 h-6 mb-1 to-neutral-700"/>
            <div>
                <Skeleton className="w-24 h-6 mb-1  bg-neutral-200"/>
                <Skeleton className="w-12 h-4 bg-neutral-200"/>
            </div>
        </div>
    )
}