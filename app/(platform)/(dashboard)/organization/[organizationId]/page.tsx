'use server'
import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'
import Form from './form';
import Info from './_components/info';
import { Separator } from '@/components/ui/separator';
import BoardList from './_components/board_list';
import { checkSubscription } from '@/lib/subscription';

const OrganizationIdPage = async () => {
    const { userId, orgId } = await auth();
    const isPro = await checkSubscription();
  return (
    <div>
       <Info isPro={isPro}/>
       <Separator className='my-4'/>
       <div className="px-2 md:px-4">
          <Suspense fallback={<BoardList.Skeleton/>}/>
          <BoardList/>
       </div>
    </div>
  )
}

export default OrganizationIdPage