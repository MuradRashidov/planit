import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Roboto } from 'next/font/google'

const inter = Roboto({ weight:['100','300','500'],style:'normal', subsets:['latin']})

const MarketingPace = () => {
  return (
    <div className={`flex flex-col justify-center items-center`}>
            <div className='flex flex-col justify-center items-center'>
                <div className='mb-4 p-4 flex items-center bg-amber-100 text-amber-700 border shadow-sm rounded-full uppercase'>
                    <Medal className='h-6 w-6 mr-2'/>
                    Best Task Management App
                </div>
                <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>Planit team support move</h1>
                <div className='text:3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 pb-4 p-2 rounded-md w-fit'>Work forvard.</div>
            </div>
            <div className={`${inter.className} text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat sit mollitia animi expedita, velit totam 
                itaque facilis doloremque cupiditate laboriosam placeat nam tenetur fugiat sunt. 
                Dignissimos odit aspernatur odio non amet expedita error nam dolor?
            </div>
            <Button className='mt-6' size='lg' asChild>
                <Link href='/sign-up'>
                    Get Planit for free
                </Link>
            </Button>
    </div>
  )
}

export default MarketingPace