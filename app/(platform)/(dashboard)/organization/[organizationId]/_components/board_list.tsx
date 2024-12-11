import { FormPopover } from '@/components/form-popover'
import { Hint } from '@/components/hint'
import { HelpCircle, User2 } from 'lucide-react'
import React from 'react'

const BoardList = () => {
  return (
    <div className='space-y-4'>
        <div className="flex items-center font-semibold text-lg text-neutral-700">
            <User2 className='h-6 w-6 mr-2'/>
            Your boards
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
         <FormPopover side='right' sideOffset={10}>
            <div role='button' className='aspect-video px-4 relative bg-muted h-full w-full hover:opacity-75 flex items-center flex-col justify-center gap-y-1 rounded-sm transition'>
                <p className='text-sm'>Create new board</p>
                <span className='text-xs'>5 remaining</span>
                <Hint description='Free forkspaces can have up to 5 boards. For unlimited boards upgrade this workspace'>
                  <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]'/>
                </Hint>
              </div>
         </FormPopover>
        </div>
    </div>
  )
}

export default BoardList