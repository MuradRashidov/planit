'use server'
import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'
import Form from './form';
import Info from './_components/info';
import { Separator } from '@/components/ui/separator';
import BoardList from './_components/board_list';

const OrganizationIdPage = async () => {
    const { userId, orgId } = await auth();
  return (
    <div>
       <Info/>
       <Separator className='my-4'/>
       <div className="px-2 md:px-4">
          <Suspense fallback={<BoardList.Skeleton/>}/>
          <BoardList/>
       </div>
    </div>
  )
}

export default OrganizationIdPage