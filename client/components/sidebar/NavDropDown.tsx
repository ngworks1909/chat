import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { CiUser, CiSettings, CiMobile1 } from "react-icons/ci";
import Logout from './Logout';
import Link from 'next/link';
import NavRequestLink from './NavRequestLink';
import { BsChatLeftTextFill } from "react-icons/bs";

export default function NavDropDown() {
  return (
    <div className='flex items-center gap-6'>
    <BsChatLeftTextFill className='text-lg cursor-pointer' />
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='outline-none'>
        <HiDotsVertical className="text-lg cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 absolute right-0">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='p-0 w-full'>
            <div className="flex items-center w-full gap-2 px-2 py-1.5">
            <CiUser size={20}/>
            <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className='p-0 w-full'>
          <div className="flex items-center w-full gap-2 px-2 py-1.5">
            <CiSettings size={20}/>
            <span>Settings</span>
            </div>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem className='p-0 w-full'>
          <Link href={'/friends'} className="flex items-center w-full gap-2 px-2 py-1.5">
            <CiMobile1 size={20}/>
            <span>Friends</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='p-0 w-full'>
             <NavRequestLink/>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-0'>
        <Logout/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}