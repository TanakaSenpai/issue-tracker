"use client"
import classNames from 'classnames'
import Link from 'next/link'
import {usePathname} from "next/navigation"
import React from 'react'
import {AiFillBug} from "react-icons/ai"

const NavBar = () => {
  const currentPath = usePathname();
  
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},
    ]
  return (
      <div className='flex space-x-6 h-16 items-center px-5 border-b'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => <li key={link.href}><Link href={link.href} className={classNames({
          "text-zinc-950": currentPath === link.href,
          "text-zinc-500": currentPath !== link.href,
          "hover:text-zinc-800 transition-colors": true
        })}>{ link.label }</Link></li>)}
      </ul>
    </div>
  )
}

export default NavBar
