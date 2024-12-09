'use server'
import { OrganizationSwitcher } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import Form from './form';

const OrganizationIdPage = async () => {
    const { userId, orgId } = await auth();
  return (
    <div>
       OrganizationPage
       <Form/>
    </div>
  )
}

export default OrganizationIdPage