import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchState } from '@/atoms/SearchState';
import { ChatState } from '@/atoms/ChatState';
import { Friend } from '@/zod/Friend';
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { FaCamera, FaMicrophone, FaVideo } from 'react-icons/fa';
import LastMessage from './LastMessage';
import { SocketState } from '@/atoms/SocketState';

export default function ContactButton({contact}: {contact: Friend}) {
  const setChat = useSetRecoilState(ChatState);
  const setSearch = useSetRecoilState(SearchState);
  const socket = useRecoilValue(SocketState);
  const handleDate = (d: Date) => {
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();    
        const date = new Date(d);    
        const givenDay = date.getDate();
        const givenMonth = date.getMonth();
        const givenYear = date.getFullYear();    
        if (todayYear === givenYear && todayMonth === givenMonth && todayDay === givenDay) {
            return 'Today';
        } else if (todayYear === givenYear && todayMonth === givenMonth && todayDay - givenDay === 1) {
            return 'Yesterday';
        } else {
            const formattedDate = `${givenDay}/${(givenMonth + 1)}/${givenYear}`;
            return formattedDate;
        }
  }
  return (
    <div onClick={async(e) => {
       e.preventDefault();
        setSearch('')
        setChat({username: contact.friend.username, friendId: contact.friendId, image: contact.friend.image})
        socket?.send(JSON.stringify({
            action: 'active-chat',
            userId: contact.userId,
            activeId: contact.friendId
        }))

    }} className="flex flex-1 flex-col items-start gap-1 p-3 text-left text-sm cursor-pointer">
        <div className="flex w-full flex-col gap-1">
            <div className={`flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <div className="font-semibold max-w-[300px] line-clamp-1">{contact.friend.username}</div>
                    {contact.last === "Incoming" && <span className={`flex h-2 w-2 rounded-full ${ contact.messageCount > 0 && 'bg-green-600'}`}></span>}
                </div>
                <div className={`ml-auto text-xs text-muted-foreground ${contact.lastMessage ? 'block': 'hidden'}`}>{handleDate(contact.time)}</div>
            </div>
        </div>
        
        <LastMessage messageType = {contact.messageType} last = {contact.last} lastMessage = {contact.lastMessage} messageStatus = {contact.lastStatus} messageCount = {contact.messageCount} />
        {/* <div className={`line-clamp-1 text-sm ${contact.incomingMessages.length > 0 ? 'text-white': 'text-muted-foreground'} w-full`}>{contact.lastMessage || "\u00A0"}</div> */}
    </div>
  )
}