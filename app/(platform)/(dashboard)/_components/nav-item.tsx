import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
export type Organization = {
    id: string;
    //slag: string;
    imageUrl: string;
    name: string;
}
interface NavItemProps {
    isExpended: boolean;
    isActive: boolean;
    onExpended: (id: string) => void;
    organization: Organization
}
const NavItem = ({
    isActive,
    isExpended,
    onExpended,
    organization
}:NavItemProps) => {
  return (
    <AccordionItem 
        value={organization.id}
        className='border-none'
    >
        <AccordionTrigger 
            onClick={() => onExpended(organization.id)}
            className={(
                `flex items-center justify-between gap-x-2 p-1.5 
            text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline ${isActive && !isExpended &&'bg-sky-500/10 text-sky-700'}`
            )}
        >
            <div className='flex items-center gap-x-2'>
                <div className='w-7 h-7 relative'>
                        <Image fill src={organization.imageUrl} alt='task management' className='rounded-sm object-cover'/>
                </div>
            </div>
        </AccordionTrigger>
    </AccordionItem>
  )
}

export default NavItem