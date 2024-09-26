"use client"
import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { useSetRecoilState } from 'recoil'
import { ChatState } from '@/atoms/ChatState'

export default function CloseChat() {
  const setChat = useSetRecoilState(ChatState);
  return (
    <DropdownMenuItem onClick={(e) => {e.preventDefault(); setChat({username: '', friendId: '', image: ''})}} className='p-0 w-full'>
          <div className="flex items-center w-full gap-2 px-2 py-1.5">
             <span>Close Chat</span>
          </div>
    </DropdownMenuItem>
  )
}
