import React from 'react'
import { BsCameraFill, BsCameraVideo, BsSoundwave } from 'react-icons/bs'
import {VscCheck, VscCheckAll} from 'react-icons/vsc'



export default function LastMessage({last, messageType, lastMessage, messageStatus, messageCount}: 
    {   last: "None" | "Incoming" | "Outgoing", 
        messageType: "text" | "audio" | "video" | "image", 
        lastMessage: string, 
        messageStatus: "Sent" | "Delivered" | "Seen", 
        messageCount: number
    }) {
  return (
    <>
    {last === "None" ? 
    <div className={`text-sm w-full`}>{"\u00A0"}</div>
    : <>
    {last === "Outgoing"? <div className={`line-clamp-1 text-sm ${messageCount > 0 ? 'text-white': 'text-muted-foreground'} w-full`}>
        <div className='flex items-center gap-2'>
            {messageStatus === "Sent" ? <VscCheck/>: messageStatus === "Delivered" ? <VscCheckAll/>: <VscCheckAll className='text-blue-600'/>}
            <div className='flex items-center gap-1'>
               {
                messageType === "text" ? <span className='line-clamp-1 text-ellipsis'>{lastMessage}</span>: 
                messageType === "image" ? <><BsCameraFill className='text-lg'/> <span className='line-clamp-1 text-ellipsis'>Photo</span> </>: 
                messageType === "video" ? <><BsCameraVideo/><span className='line-clamp-1 text-ellipsis'>Video</span></> : <><BsSoundwave size={16} /><span className='line-clamp-1 text-ellipsis'>Audio</span></>
               }
            </div>
        </div>
    </div>: 
    <div className={`line-clamp-1 text-sm ${messageCount > 0 ? 'text-white': 'text-muted-foreground'} w-full`}>
        <div className='flex items-center gap-1'>
           {
            messageType === "text" ? <span className='line-clamp-1 text-ellipsis'>{lastMessage}</span>: 
            messageType === "image" ? <><BsCameraFill className='text-lg'/> <span className='line-clamp-1 text-ellipsis'>Photo</span> </>: 
            messageType === "video" ? <><BsCameraVideo/><span className='line-clamp-1 text-ellipsis'>Video</span></> : <><BsSoundwave/><span className='line-clamp-1 text-ellipsis'>Audio</span></>
           }
        </div>
    </div>
    }
    </>}
    </>
  )
}
