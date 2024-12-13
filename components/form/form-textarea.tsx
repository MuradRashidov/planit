'use client'

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

 interface FormTextAreaProps {
   id: string;
   label?: string;
   placeholder?:  string;
   required?: boolean;
   disabled?: boolean;
   errors?: Record<string,string[] | undefined>
   className?: string;
   onClick?: () => void;
   onBlur?: () => void;
   onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
   defaultValue?: string
 };
 
 export const FormTextarea = forwardRef<HTMLTextAreaElement,FormTextAreaProps>(
    ({
        id,
        label,
        placeholder,
        required,
        className,
        defaultValue,
        disabled,
        errors,
        onBlur,
        onClick,
        onKeyDown
     },ref) => {
       const { pending } = useFormStatus();
       return (
         <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {
                    label?(
                        <Label
                        htmlFor="id"
                        className="text-xs font-semibold to-neutral-700"
                        >
                            {label}
                        </Label>
                    ):(null)
                }
                <Textarea
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onClick={onClick}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
                disabled={pending || disabled}
                id={id}
                name={id}
                aria-describedby={`${id}-error`}
                className={
                    `resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm
                    ${className}`}

                />
            </div>
            <FormErrors id={id} errors={errors}/>
         </div>
       )
     }
 );

 FormTextarea.displayName = "FormTextArea";