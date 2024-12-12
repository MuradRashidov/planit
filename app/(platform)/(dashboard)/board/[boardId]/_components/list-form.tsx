'use client'

import { Plus } from "lucide-react";
import { ListWrapper } from "./list-wrapper";

interface ListFormProps {
  
};

export const ListForm = ({}: ListFormProps) => {
  return <ListWrapper>
        <button className="w-full rounded-md flex items-center bg-white/80 hover:bg-white/50 text-sm transition p-3 font-medium">
           <Plus className="h-4 w-4 m-2"/>
            Add a list
        </button>
  </ListWrapper>;
};