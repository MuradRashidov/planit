"use client"
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[]
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData,setOrderedData] = useState(data);
  useEffect(()=>{
    setOrderedData(data)
  });

  return <ol className="flex gap-x-3 h-full">
    {
      orderedData.map((list,index) => (
        <ListItem key={list.id} index={index} data={list}/>
      ))
    }
    <div className="flex-shrink-0 w-1"/>
    <ListForm/>
  </ol>;
};