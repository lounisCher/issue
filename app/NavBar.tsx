'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames';   
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathName = usePathname();
  const links=[
    {label: 'Dashboard', href:'/'},
    {label: 'Issues', href:'/issues'}
  ]
  return (
    <nav className='flex space-x-7 mb-5 border-b px-5 h-14 items-center shadow-md bg-slate-200'>
      <Link href="/">
      <AiFillBug size={20}/>
      </Link>
      <ul className='flex space-x-7'>
        {links.map((link)=>(
          <li key={link.href}>
            <Link href={link.href}
            className={classNames({
              'text-slate-900': link.href===pathName,
              'text-zinc-500': link.href !== pathName,
              'hover:text-zinc-600 transition-colors font-bold': true
            })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
