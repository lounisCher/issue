import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
  return (
    <nav className='flex space-x-7 mb-5 border-b px-5 h-14 items-center shadow-md bg-slate-200'>
      <Link href="/">
      <AiFillBug size={20}/>
      </Link>
      <ul className='flex space-x-7'>
        <li className='font-bold'>
            <Link href="/"
            className='hover:text-zinc-600 transition-colors'>Dashboard</Link>
        </li>
        <li className='font-bold'>
            <Link href="/issues" className='hover:text-zinc-600 transition-colors'>
                Issues
            </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
