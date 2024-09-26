"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";
import { useRecoilValue } from 'recoil';
import { ChatState } from '@/atoms/ChatState';

export default function ChatUser() {
  const {username, image} = useRecoilValue(ChatState)
  return (
    <div className="flex gap-6 items-center">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback><CiUser size={20}/></AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='text-md font-medium tracking-[0.5px]'>{username}</span>
        <span className='text-xs text-[#dcdbdb]'>offline/online</span>
        </div>
    </div>
  )
}