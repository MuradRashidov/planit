import { FormPopover } from '@/components/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { db } from '@/lib/db'
import { getAvailableCaunt } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const BoardList = async () => {
  const isPro = await checkSubscription();
  const { orgId } = await auth();
  if(!orgId) return redirect('/select-org');
  
  const boards = await db.board.findMany({ where: {
    orgId
  }, orderBy: {
    createdAt:'desc'
  }});

  const availableCount:any = await getAvailableCaunt();
  return (
    <div className='space-y-4 flex flex-col'>
        <div className="flex items-center font-semibold text-lg text-neutral-700">
            <User2 className='h-6 w-6 mr-2'/>
            Your boards
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            boards.map((board) => (
                <Link 
                  key={board.id}
                  href={`/board/${board.id}`}
                  style={{
                    backgroundImage: `url(${board.imageThumbUrl})`
                  }}
                  className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
                  >
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition'/>
                  <p className='font-semibold text-white relative'>{board.title}</p>
                </Link>
            ))
          }
         <FormPopover side='right' sideOffset={10}>
            <div role='button' className='aspect-video px-4 relative bg-muted h-full w-full hover:opacity-75 flex items-center flex-col justify-center gap-y-1 rounded-sm transition'>
                <p className='text-sm'>Create new board</p>
                <span className='text-xs'>{isPro?"Unlimitid":`${MAX_FREE_BOARDS - availableCount} remaining`}</span>
                <Hint description='Free forkspaces can have up to 5 boards. For unlimited boards upgrade this workspace'>
                  <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]'/>
                </Hint>
              </div>
         </FormPopover>
        </div>
    </div>
  )
}
BoardList.Skeleton = function BoardListSkeleton() {
  return <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
            <Skeleton className='aspect-video w-full h-full p-2'/>
        </div>
}
export default BoardList