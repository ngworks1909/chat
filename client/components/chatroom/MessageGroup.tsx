"use client"
import React, { useEffect } from 'react'
import MessageItem from './MessageItem'
import { useMessages } from '@/hooks/useMessages'
import { useSession } from 'next-auth/react';
import MessageSkeleton from '../skeletons/MessageSkeleton';

export default function MessageGroup() {
  const session:any = useSession();
  const userId = session.data?.user.id;
  const {messages, loading} = useMessages();
  return (
    <>
     {loading ? <MessageSkeleton/> :
      messages.map((message) => {
           return <MessageItem key={message.messageId} message={message} senderId = {userId} />
       })}
    </>   
  )
}
