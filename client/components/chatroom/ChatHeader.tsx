import React from 'react'
import ChatUser from './ChatUser'
import ChatHeaderIcons from './ChatHeaderIcons'

export default function ChatHeader() {
  return (
    <div className='bg-[#202c33] h-16 flex w-full items-center px-4 justify-between'>
        <ChatUser/>
        <ChatHeaderIcons/>
    </div>
  )
}
