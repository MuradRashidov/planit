import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
        <div className='hover:opacity-75 transition items-center hidden p-1 gag-x-2 md:flex'>
            <Image style={{borderRadius:50}} src={'/logo.png'} height={45} width={45} alt='task management'/>
        </div>
    </Link>
  )
}

export default Logo