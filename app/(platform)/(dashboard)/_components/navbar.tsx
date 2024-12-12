import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { FormPopover } from '@/components/form-popover'

const Navbar = () => {
  return (
    <nav className='fixed z-50 px-4 top-0 bg-white w-full h-14 bottom-b shadow-sm flex items-center'>
        <MobileSidebar/>
        <div className='flex items-center gap-x-4'>
            <div className='hidden md:flex'>
                <Logo/>
            </div>
            <FormPopover align='start' side='bottom' sideOffset={18}>
            <Button variant='primary' size='sm' className='hidden md:block py-1.5 px-2 h-auto'>Create</Button>
            </FormPopover>
            <FormPopover>
            <Button variant='primary' size='sm' className='md:hidden rounded-sm'><Plus/></Button>
            </FormPopover>
        </div>
        <div className='ml-auto flex items-center gap-x-2'>
            <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl='/organization/:id'
                afterLeaveOrganizationUrl='/select-org'
                afterSelectOrganizationUrl='/organization/:id'
                appearance={{
                    elements: {
                        rootBox:{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }
                }}
            />
            <UserButton
                appearance={{
                    elements:{
                        avatarBox: { height:30, width: 30 }
                    }
                }}
            />
        </div>
    </nav>
  )
}

export default Navbar