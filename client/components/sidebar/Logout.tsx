"use client"
import React from 'react'
import { CiLogin } from 'react-icons/ci'
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from '../ui/dropdown-menu';


export default function Logout() {
  return (
    <DropdownMenuItem className='w-full cursor-pointer' onClick={async(e) => {e.preventDefault(); await signOut()}}>
    <div className="flex items-center w-full gap-2">
        <CiLogin size={20}/>
        <span>Logout</span>
    </div>
    </DropdownMenuItem>
  )
}