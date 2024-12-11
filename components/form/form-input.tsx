'use client'

import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string,string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    className,
    defaultValue,
    disabled,
    errors,
    label,
    onBlur,
    placeholder,
    required,
    type
    
},ref) => {
    const { pending } = useFormStatus(); 
    return(
        <div className="space-y-2">
            <div className="space-y-1">
                {
                    label? (
                        <Label className="text-xs font-semibold text-neutral-700">
                            {label}
                        </Label>
                    ):null
                }
                <Input
                                onBlur={onBlur}
                                defaultValue={defaultValue}
                                required={required}
                                disabled={pending || disabled}
                                name={id}
                                id={id}
                                ref={ref}
                                placeholder={placeholder}
                                type={type}
                                className={`text-sm px-2 py-1 h-7 ${className}`}
                                aria-describedby={`${id}-error`}
                            />
            </div>
            <FormErrors errors={errors} id={id}/>
        </div>
    )
})
FormInput.displayName = 'Form Input'