"use client"
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[]
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData,setOrderedData] = useState(data);

  const { execute: executeListOrder } = useAction(updateListOrder, {
    onSuccess: () => toast.success('List reordered'),
    onError: (err) => toast.error(err)
  });

  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => toast.success('Card reordered'),
    onError: (err) => toast.error(err)
  });

  
  useEffect(()=>{
    setOrderedData(data)
  },[data]);
  function reorder<T>(list:T[],startIndex:number,endIndex:number){
      const result = Array.from(list);
      const [removed] = result.splice(startIndex,1);
      result.splice(endIndex,0,removed);
      
      return result;
  }
  const onDragEnd = (result:any) => {
    const { destination, source, type } = result;  
    if(!destination) return;
    if (
      destination.droppableId === source.droppableId 
      &&
      destination.index === source.index

    ) return;

    if (type === 'list') {      
      const items = reorder(orderedData,source.index,destination.index).map((item,index) => ({...item,order:index}));
      const newItems = items.map((item) => ({
        id: item.id,
        title:item.title,
        order:item.order,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
      setOrderedData(items);
      executeListOrder({ items:newItems, boardId})
    }

    if (type === 'card') {
      let newOrderedData = [...orderedData];
      let sourceList = newOrderedData.find((list) => list.id === source.droppableId);
      let destList = newOrderedData.find((list) => list.id === destination.droppableId);

      if(!sourceList || !destList) return;
      if (!sourceList.cards) sourceList.cards = [];
      if (!destList.cards) destList.cards = [];

      if (destination.droppableId === source.droppableId) {
        const reorderedCards = reorder(sourceList.cards,source.index,destination.index);
        reorderedCards.forEach((card,index) => { card.order = index });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        executeCardOrder({boardId,items: destList.cards});
      } if (destination.droppableId !== source.droppableId) {
        console.log(destination.droppableId,source.droppableId);
        
        const [movedCard] = sourceList.cards.splice(source.index,1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index,0,movedCard);
        destList.cards.forEach((item,index) => item.order = index);
        sourceList.cards.forEach((item,index) => item.order = index);
        
        setOrderedData(newOrderedData);
        executeCardOrder({boardId,items: destList.cards});

      }
      
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="lists" type="list">
          {(provided) => (             
              <ol 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-x-3 h-full">
                  {
                    orderedData.map((list,index) => (
                      <ListItem key={list.id} index={index} data={list}/>
                    ))
                  }
                  <div className="flex-shrink-0 w-1"/>
                  {provided.placeholder}
                  <ListForm/>
              </ol>
          )}
      </Droppable>
    </DragDropContext>
  );
};