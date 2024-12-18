import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";


interface DescriptionProps {
   data: CardWithList
};

export const Description = ({ data }: DescriptionProps) => {
  const [isEditing,setIsEditing] = useState(false);

  const params = useParams();
  const queryClient = useQueryClient();

  const textAreaRef = useRef<ElementRef<'textarea'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);
  const { execute, fieldErrors } = useAction(updateCard,{
    onSuccess: (data) => {
        toast.success(`${data.title} updated`);
        queryClient.invalidateQueries({
            queryKey: ['card',data.id],
        });
        queryClient.invalidateQueries({
            queryKey: ['card-logs',data.id],
        });
        disableEditing();
    },
    onError: (err) => toast.error(err)
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
     textAreaRef.current?.focus();   
    });
  }
  
  const disableEditing = () => setIsEditing(false);

  const onKeyDown = (e:KeyboardEvent) => {
    if(e.key === 'Escape') disableEditing();
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef,disableEditing);
  const handleSubmit = (formData:FormData) => {
        const id = data.id;
        const description = formData.get('description') as string;
        const boardId = params.boardId as string;

        execute({
            boardId,
            id,
            description
        });
  }
  return (
   <div className="flex items-start gap-x-3 w-full">
    <AlignLeft className="w-5 h-5 text-neutral-700 mt-0.5" />
    <div className="w-full">
        <p className="font-semibold to-neutral-700 mb-2">
            Description
        </p>
        { isEditing?
        (
            <form 
            ref={formRef}
            className="skew-y-2"
            action={handleSubmit}
            >
            <FormTextarea
            id="description"
            className="w-full mt-2"
            placeholder="Add a more detailed description"
            defaultValue={data.description || 'undefined'}
            errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
                <FormSubmit>
                    Save
                </FormSubmit>
                <Button
                type="button"
                variant="ghost"
                onClick={disableEditing}
                size="sm"
                >
                    Cancel
                </Button>
            </div>
            </form>
        ):
        (
            <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            >
            {data.description || 'Add a more detailed description...'}
            </div>
        )
        }
    </div>
   </div>
  )
};

Description.Skeleton = function DescriptionSkeleton () {
    return (
        <div className="flex items-center gap-x-3 w-full">
            <Skeleton className="w-6 h-6 bg-neutral-200"/>
            <div className="w-full">
            <Skeleton className="w-24 h-6 mb-2 bg-neutral-200"/>
            <Skeleton className="w-full h-[78px] bg-neutral-200"/>
            </div>
        </div>
    )
}