interface FormErrorsProps {
    id?: string;
    errors?: Record<string, string[] | undefined>;
  }
  
import { XCircle } from "lucide-react";
  import React from "react";
  
  const FormErrors = ({ id, errors }: FormErrorsProps) => {
    if (!errors || !id) return null; // `id` ve `errors` kontrolü eklenmiştir.
    
    return (
      <div
        id={`${id}-error`}
        aria-live="polite"
        className="mt-2 text-xs text-rose-500"
      >
        {errors[id]?.map((error, index) => (
          <div className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm" key={index}>
            <XCircle className="h-4 w-4 mr-2"/>
            {error}
          </div> 
        ))}
      </div>
    );
  };
  
  export default FormErrors;
  