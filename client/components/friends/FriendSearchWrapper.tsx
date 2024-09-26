"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { User } from '@/hooks/useDebounce';
import { useDebounce } from '@/hooks/useDebounce';
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CiUser } from 'react-icons/ci'
import RequestButton from './ReqestButton';

export default function FriendSearchWrapper() {
  const [data, setData] = useState('')
  const friends = useDebounce(data, 500);
  return (
    <>
      <div className='flex flex-col mt-4 shadow-2xl shadow-border'>
          <Input type={"text"} placeholder="Email or mobile" value={data} onChange={(e) =>{e.preventDefault(); setData(e.target.value)}} />
      </div>
      <div className='flex h-[50dvh] flex-col mt-4 gap-4 overflow-hidden overflow-y-scroll'>
        {data.length > 0 && friends.length === 0 && <div className='h-full flex items-center justify-center'><span>No results found</span></div>}
        {friends.map((friend: User, index: number) => {
          return <>
          <Card key={index} className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
          <Avatar>
             <AvatarImage src= {friend.image} />
             <AvatarFallback><CiUser size={20}/></AvatarFallback>
             </Avatar>
            <span className='text-sm'>{friend.name}</span>
          </div>
            <RequestButton recieverId={friend.id} friendStatus = {friend.status} />
          </Card>
          </>
        })}
      </div>
    </>
  )
}