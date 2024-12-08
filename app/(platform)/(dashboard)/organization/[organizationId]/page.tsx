import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const OrganizationIdPage = async () => {
    const { userId, orgId } = await auth();
  return (
    <div>
       OrganizationPage
    </div>
  )
}

export default OrganizationIdPage