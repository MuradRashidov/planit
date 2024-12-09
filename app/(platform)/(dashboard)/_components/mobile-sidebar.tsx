'use client'
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

const MobileSidebar = () => {
    const pathName = usePathname();
    const isOpen = useMobileSidebar((state) => state.isOpen);
    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    
    const [isMounted,setIsMounted] =useState(false);
    useEffect(() => {
        setIsMounted(true);
    });
    useEffect(() => {
        onClose();
    },[pathName,onClose]);
    if (!isMounted) return null;
  return (
    <div>
        <Button 
            size='sm'  
            className='block md:hidden mr-2'
            onClick={onOpen}
            variant='ghost'
        >
            <Menu className='w-4 h-4'/>
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTitle>
            <span className="sr-only">Sidebar</span>
          </SheetTitle>
            <SheetContent side='left' className='p-2 pt-10'>
                <Sidebar storageKey='planit-sidebar-mobile-state'/>
            </SheetContent>
        </Sheet>
    </div>
  );
}

export default MobileSidebar