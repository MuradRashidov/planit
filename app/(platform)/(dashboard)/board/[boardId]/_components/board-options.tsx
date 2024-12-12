'use client'
import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

interface BoardOptionsProps {
  id: string
};

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard,{
    onError:(err) => toast.error(err)
  })
  return <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant='transparent'>
                  <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 py-3" side="bottom" align="start">
                  <div className="font-medium text-sm text-center to-neutral-600 pt-3">Board actions</div>
                  <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 to-neutral-600" variant='ghost'>
                      <X className="h-4 w-4"/>
                    </Button>
                  </PopoverClose>
                  <Button 
                  variant='ghost'
                  disabled={isLoading}
                  onClick={() => execute({id})} className="w-full h-auto rounded-none text-sm p-2 px-5 justify-start font-normal">
                    Delete this board
                  </Button>
            </PopoverContent>
         </Popover>
}