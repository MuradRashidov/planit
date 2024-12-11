'use clent'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
    className?: string;
}

export const FormSubmit = ({
    children,
    className,
    disabled,
    variant
}:FormSubmitProps) => {
    const { pending } = useFormStatus();
    return (
        <Button 
            disabled={ disabled || pending} 
            className={className} 
            variant={variant} 
            type="submit" 
            size='sm'
        >
            {children}
        </Button>
    )
}