'use client'
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useLocalStorage } from 'usehooks-ts';
import NavItem, { Organization } from './nav-item';
interface SidebarProps {
    storageKey?: string
}
const Sidebar = ({storageKey = "p-sidebar-state"}:SidebarProps) => {
    const [expended,setExpended] = useLocalStorage<Record<string ,any>>(storageKey,{});
    const { 
        organization: activeOrganization,
        isLoaded: isLoadedOrg
    } = useOrganization();

    const { 
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    });

    const defaultAccordionValue: string[] = Object.keys(expended).reduce((acc: string[],key: string) => {
        if (expended[key]) {
            acc.push(key)
        }
        return acc
    },[]);
    const onExpanded = (id: string) => {
        setExpended((curr) => {
            return {
                ...curr,
                [id]:!expended[id]
            }
        })
    }
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className='flex items-center justify-between mb-2'>
                <Skeleton className='h-10 w-[50%]'/>
                <Skeleton className='h-10 w-10'/>
                </div>
                <div className='space-y-2'>
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
                </div>
            </>
        )
    }
    
    
  return (
    <>
        <div className='mb-1 font-medium text-xs flex items-center'>
            <span className='pl-4'>
                Workspaces
            </span>
            <Button variant='ghost' size='icon' type='button' className='ml-auto' asChild>
                <Link href='/select-org'>
                    <Plus className='h-4 w-4'/>
                </Link>
            </Button>
        </div>
        <Accordion 
            type='multiple' 
            defaultValue={defaultAccordionValue} 
            className='space-y-2'
        >
            {
                userMemberships.data?.map(({organization}) => {                    
                    return (
                        <div key={organization.id}>
                            <NavItem 
                            isActive={activeOrganization?.id == organization.id}
                            isExpended={expended[organization.id]}
                            onExpended={onExpanded}
                            organization={organization as Organization}
                        />
                        </div>
                    )
                })
            }
        </Accordion>
    </>
  )
}

export default Sidebar