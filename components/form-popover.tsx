'use client'

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FormInput } from "./form/form-input";
import { FormSubmit } from "./form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "../actions/create-board/index";
import  { toast }  from 'sonner';
import { FormPicker } from "./form/form-picker";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    align,
    children,
    side='bottom',
    sideOffset=0
}: FormPopoverProps) => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess:(data) => {
            console.log(data);
            toast.success("Board created");
        },
        onError:(err) => {
            console.log(err)
            toast.error(err
                
            )
        }
    })
    const onSubmit = (formData: FormData) => {
        const title  = formData.get('title') as string;
        execute({title});
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant='ghost'>
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors}/>
                        <FormInput errors={fieldErrors} id="title" label="Board Title" type="text"/>
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
};