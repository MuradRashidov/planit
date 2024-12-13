import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { ListContainer } from './_components/list-container';

interface BoardIdPageProps {
  params: Promise<{ boardId: string }>;
}
const BoardIdPage = async ({ params} : BoardIdPageProps) => {
  const { orgId } = await auth();
  const { boardId } = await params
  const lists = await db.list.findMany({ 
    where: { boardId, board:{orgId : orgId!}},
    include: { cards: {orderBy: { order: "asc"}}},
    orderBy: { order: "asc" }
  
  })
  if (!orgId) redirect('/select-org');
  return (
    <div className='p-4 h-full overflow-x-auto'>
      <ListContainer boardId={boardId} data={lists}/>
    </div>
  )
}

export default BoardIdPage