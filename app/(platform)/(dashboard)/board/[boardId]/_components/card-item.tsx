'use client'

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
};

export const CardItem = ({ data, index}: CardItemProps) => {
  const cardModal = useCardModal(state => state);
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div 
        onClick={() => cardModal.onOpen(data.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        role="button"
        className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm  bg-white rounded-md shadow-sm"
        >
            { data.title }
        </div>
      )}
    </Draggable>
  )
};