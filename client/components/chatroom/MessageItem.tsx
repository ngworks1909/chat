import React, {useEffect, useRef} from 'react'
import { Message } from '@prisma/client';
import { BsCheck2, BsCheck2All } from 'react-icons/bs';
import VoiceMessage from './VoiceMessage';

export default function MessageItem({message, senderId}: {message:Message, senderId: string }) {

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
      ref.current?.scrollIntoView({behavior : "smooth"})
  },[]);


  const handleDate = (d: Date) => {
    const date = new Date(d);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM'; 
    const formattedTime = `${(hours % 12 || 12).toString()}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }
  return (
    <>
    <div key={message.messageId} ref={ref} className={`flex w-fit relative max-w-[75%] gap-3 rounded-lg h-max shadow-lg ${(message.senderId === senderId) ? 'ml-auto bg-[#005c4b]': 'bg-[#202c33cd]' } ${message.type === 'image' ? 'flex-col gap-0': 'px-3'}`}>
           {message.type === "text" && <span className='text-sm font-medium py-[6px]'>{message.message}</span>}
           {message.type === "image" && <input className='h-56 w-56 p-1 shadow-md rounded-lg' type='image' src={message.message} alt='A' />}
           {message.type === "audio" && <VoiceMessage message={message}/>}
           <div className={`flex gap-1 pb-1 ${message.type === "image" && 'absolute bottom-0 bg-image-bottom w-full h-6 justify-end px-2'}`}>
           <span className='text-[10px] self-end'>{handleDate(message.date)}</span>
           <div className='flex items-end'>{message.senderId === senderId && (message.messageStatus === 'Sent' ? <BsCheck2/> : message.messageStatus === 'Delivered' ? <BsCheck2All/> : <BsCheck2All className='text-[#53bdeb]'/>)}</div>
           </div>     
    </div>
    </>
  )
}