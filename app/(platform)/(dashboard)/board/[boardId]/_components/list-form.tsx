'use client'

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";



export const ListForm = () => {
  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const [isEditing,setIsEditing] = useState(false);
  const router = useRouter();
  const enebleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
     inputRef.current?.focus(); 
    });
  }

  const disableEditing = () => setIsEditing(false);
  const keyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }
  useEventListener("keydown",keyDown);
  useOnClickOutside(formRef,disableEditing); 
  const params = useParams();
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} created`);
      disableEditing();
      router.refresh();
    }
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;
    console.log(boardId);
    
    execute({boardId,title})
  }
  if(isEditing){
    return (
      <ListWrapper>
        <form 
        action={onSubmit}
        ref={formRef}
        className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
      >
        <FormInput
        id="title"
        placeholder="Enter list title..."
        ref={inputRef}
        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
        />
        <input 
        onChange={() => null}
        hidden
        name="boardId"
        value={params.boardId}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
              Add List
          </FormSubmit>
          <Button size='sm' variant='ghost' onClick={disableEditing}>
            <X className="w-5 h-5"/>
          </Button>
        </div>
      </form>
      </ListWrapper>
    )
  }
   return <ListWrapper>
        <button 
        onClick={enebleEditing}
        className="rounded-md flex items-center bg-white/80 hover:bg-white/50 text-sm transition p-3 font-medium"
        >
           <Plus className="h-4 w-4 m-2"/>
            Add a list
        </button>
       </ListWrapper>;
};