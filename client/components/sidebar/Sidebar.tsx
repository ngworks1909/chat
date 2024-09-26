"use client"
import { ChatState } from '@/atoms/ChatState'
import { SocketState } from '@/atoms/SocketState';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState} from 'recoil'



export default function Sidebar({ children }: { children: React.ReactNode; }): JSX.Element {
  const {friendId} = useRecoilValue(ChatState);
  const setSocket = useSetRecoilState(SocketState);
  const session:any = useSession();
  const userId = session.data?.user.id

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000')
    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: 'add-user',
        userId
      }))
    }

    setSocket(socket);
  }, [userId, setSocket])
  
  return (
    <div className={` flex-col h-full bg-[#111b21] border-r border-[#383838] ${friendId && 'vsm:hidden'} flex-1 lg:flex-[0.85]`}>
        {children}
    </div>
  )
}