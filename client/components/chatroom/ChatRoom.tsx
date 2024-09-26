"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { ChatState } from '@/atoms/ChatState'

export default function ChatRoom({ children }: { children: React.ReactNode; }): JSX.Element {
  const {friendId} = useRecoilValue(ChatState)
  return (
    <div className={`bg-[#010c18] ${!friendId && 'vsm:hidden'} flex flex-[2] flex-col`}>
       {friendId ? <>
        {children}
       </>: <>
          <div className='h-full w-full flex items-center flex-col gap-2 justify-center'>
            <Image src={logo} alt='Whastapp' className='h-16 w-16' />
            <span>Choose someone to chat with...</span>
          </div>
       </>}
    </div>
  )
}
