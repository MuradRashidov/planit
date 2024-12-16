'use client'
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

 
interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title,setTitle] = useState(data.title);
  const [isEditing,setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
     inputRef.current?.focus();
     inputRef.current?.select();   
    });
  }

  const disableEditing = () => setIsEditing(false);
  const onKeyDown = (e:KeyboardEvent) => {
    if(e.key === "Escape") formRef.current?.submit();
  }
  useEventListener("keydown",onKeyDown);

  const { execute, fieldErrors } = useAction(updateList,{
    onSuccess: (data) => {
        toast.success(`${title} updated with ${data.title}`)
        setTitle(data.title);
        disableEditing()
    },
    onError: (err) => {
        toast.error(err)
    }
  });

  const handleSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const id = formData.get('id') as string;
      const boardId = formData.get('boardId') as string;
      console.log("Info: ",{title,id,boardId});
      

      execute({
        id,
        boardId,
        title
      });
  }

  const onBlur = () => formRef.current?.submit();

  return (
    <div className="font-semibold pt-2 px-2 text-sm flex justify-center items-start gap-x-2">
        {
            isEditing?(
               <form
               action={handleSubmit}
               ref={formRef}
               className="flex-1 px-[2px]"
               >
                    <input onChange={() => null} id="id" hidden name="id" value={data.id} />
                    <input onChange={() => null} id="boardI" hidden name="boardId" value={data.boardId} />
                    <FormInput
                        id="title"
                        errors={fieldErrors}
                        ref={inputRef}
                        onBlur={() => onBlur()}
                        defaultValue={title}
                        placeholder="Update list title"
                        className="text-sm transition truncate px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input focus:bg-white"
                    />
                    <button type="submit" hidden/>
               </form>
            ):
            (
                <div
        onClick={enableEditing}
        className="w-full text-sm px-2.5 py-1 font-medium h-7 ">
            { title }
        </div>
            )
        }
      <ListOptions data={data} onAddCard={onAddCard}/>
    </div>
  );
};