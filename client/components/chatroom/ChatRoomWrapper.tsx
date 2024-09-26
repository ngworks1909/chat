import React from 'react'
import ChatHeader from './ChatHeader'
import MessageGroup from './MessageGroup'
import Input from './Input'


export default function ChatRoomWrapper() {
  return (
      <>
      <ChatHeader/>
      <div className='flex flex-1 flex-col relative overflow-hidden'>
        <div className='bg-bg-image h-full w-full z-0 bg-fixed'>
           <div className='flex h-full w-full flex-col px-4 sm:px-8 pt-8 pb-3 gap-1 overflow-hidden overflow-y-scroll'>
               <MessageGroup/>
           </div>
        </div>
      </div>
      <Input/>
      </>
  )
}
