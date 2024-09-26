import React from 'react'
import Sidebar from './sidebar/Sidebar'
import SidebarWrapper from './sidebar/SidebarWrapper'
import ChatRoomWrapper from './chatroom/ChatRoomWrapper'
import ChatRoom from './chatroom/ChatRoom'

export default function Home() {
  return (
    <div className='h-dvh w-dvw overflow-hidden flex p-[2px] sm:p-5'>
        
  <>
    <Sidebar><SidebarWrapper/></Sidebar>
    <ChatRoom><ChatRoomWrapper/></ChatRoom>
  </>
    </div>
  )
}
