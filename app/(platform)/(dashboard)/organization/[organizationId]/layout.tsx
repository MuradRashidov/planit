import React from 'react'
import OrgControl from './_components/org-control'
import { auth } from '@clerk/nextjs/server'
import { startCase } from 'lodash';
export const generateMetadata = async () => {
  const { orgSlug } = await auth();
  return {
    title: startCase(orgSlug || 'organization')
  }
}
const OrganizationIdLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        <OrgControl/>
        {children}
    </div>
  )
}

export default OrganizationIdLayout