import React from 'react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { Friend } from '@/zod/Friend'
import Dialog from './Dialog'
import image from '@/assets/verfiy.png';

export default function ContactSearchWrapper({contact}: {contact: Friend}) {
  return (
    <Card className='p-4'>
        <div className='flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
        <input type="image" className='h-8 w-8 rounded-full' src={contact.friend.image} alt="A" />
        <div className='flex flex-col overflow-hidden'>
            <span className='text-sm leading-5 text-[#ededed] font-medium'>{contact.friend.username}</span>
            <span className='line-clamp-1 leading-5 text-sm text-[#a1a1a1] font-normal'>{contact.friend.email}</span>
        </div>
        </div>
        <Badge variant={"secondary"} className='py-1 pl-2 pr-5 text-sm flex gap-1 w-max rounded-3xl' >
        <Image src={image} className='h-5 w-5' alt='I'/>
        <span>Verified</span>
        </Badge>
        <div className='flex justify-end'>
         <Dialog friendId={contact.friendId} />
        </div>
        </div>
    </Card>
  )
}