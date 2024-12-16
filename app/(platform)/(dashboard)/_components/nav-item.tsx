import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const pathName = usePathname();
  const routes = [
    {
        lebel:"Boards",
        icon: <Layout className='h-4  w-4 mr-2'/>,
        href: `/organization/${organization.id}`
    },
    {
        lebel:"Activity",
        icon: <Activity className='h-4  w-4 mr-2'/>,
        href: `/organization/${organization.id}/activity`
    },
    {
        lebel:"Settings",
        icon: <Settings className='h-4  w-4 mr-2'/>,
        href: `/organization/${organization.id}/settings`
    },
    {
        lebel:"Billing",
        icon: <CreditCard className='h-4  w-4 mr-2'/>,
        href: `/organization/${organization.id}/billing`
    }
  ];
  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem 
        value={organization.id}
        className='border-none'
    >
        <AccordionTrigger 
            onClick={() => onExpended(organization.id)}
            className={(
                `flex items-center justify-between gap-x-2 p-1.5 
                 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline 
                 hover:no-underline ${isActive && !isExpended &&'bg-sky-500/10 text-sky-700'}`
            )}
        >
            <div className='flex items-center gap-x-2'>
                <div className='w-7 h-7 relative'>
                        <Image fill src={organization.imageUrl || "/hero.png"} alt='task management' className='rounded-sm object-cover'/>
                </div>
                <span className='font-medium text-sm'>{organization.name}</span>
            </div>
        </AccordionTrigger>
        <AccordionContent className='pt-1 text-neutral-700'>
            {
                routes.map((route) => (
                    <Button
                        key={route.href}
                        onClick={() => {onClick(route.href)}}
                        size='sm'
                        variant='ghost'
                        className={(
                            `w-full justify-start font-normal pl-10 mb-1
                            ${pathName === route.href && 'bg-gray-500/10 text-sky-700'}`
                        )}
                    >
                        {route.icon}
                        {route.lebel}
                    </Button>
                ))
            }
        </AccordionContent>
    </AccordionItem>
  )
}
NavItem.Skeleton = function SkeletonNavItem () {
    return <div className='flex items-center gap-x-2'>
                <div className='w-10 h-10 relative shrink-0'>
                    <Skeleton className='h-full w-full absolute'/>
                </div>
                <Skeleton className='h-10 w-full'/>
           </div>
}
export default NavItem