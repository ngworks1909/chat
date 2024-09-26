"use client"
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import {ImAttachment} from 'react-icons/im'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { ChatState } from '@/atoms/ChatState';
import { IoMdSend } from 'react-icons/io'
import { useRecoilValue } from 'recoil';
import {FaMicrophone} from 'react-icons/fa'
import { SocketState } from '@/atoms/SocketState';
import { MessageLoadingState } from '@/atoms/MessageLoadingState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { uploadFile } from '@/actions/uploadFile'
import CaptureAudio from './CaptureAudio'


export default function Input() {
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState('');
  const friend = useRecoilValue(ChatState);
  const loading = useRecoilValue(MessageLoadingState)
  const socket = useRecoilValue(SocketState);
  const [file, setFile] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if(event.target.id !== "emoji-open"){
        if(pickerRef.current && !pickerRef.current.contains(event.target)){
          setDisplay(false)
        }
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, []);

  const photoChange = async(e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files){
      const filesArray = Array.from(files);
      setFile(filesArray)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  
      }
      setOpen(true)
    }
  }

  const sendMessage = async(recieverId: string, mess: string, messageType: string ) => {
    const response = await fetch(`/api/sendmessage`, {
      method: "POST",
      body: JSON.stringify({recieverId, message:mess, messageType})
    });
    const json = await response.json();
    if(json.success){
      setMessage('');
      if(socket){
        socket.send(JSON.stringify({
          action: 'send-message',
          data: json.message
        }))
      }
    }
  }

  const handleFiles = async() => {
    if(file){
      file.forEach(async(item) => {
        const url = await uploadFile(item);
        await sendMessage(friend.friendId, url, "image")
      })
    }

  }


  const handleClick = async() => {
    if(message){
      await sendMessage(friend.friendId, message, "text")
    }
  }



  return (
    <div className='bg-[#202c33] h-16 flex w-full px-4 items-center sm:px-6 relative'>
        {!showAudioRecorder && <>
          <div className='flex sm:gap-6'>
        {display && <div className='absolute bottom-20 left-4 z-40' ref={pickerRef} >
              <EmojiPicker onEmojiClick={(emoji) => {setMessage(prevMessage => (prevMessage += emoji.emoji))}}  theme = {Theme.DARK} />
        </div>}
          <BsEmojiSmile className='cursor-pointer text-xl hidden sm:block' id='emoji-open' onClick={() => { setDisplay(!display) }} />
           <input type="file" multiple ref={fileInputRef} accept="image/*" className='hidden' onChange={photoChange} name="send-image" id="send-image" />
           <label htmlFor="send-image">
           <ImAttachment className='cursor-pointer text-xl'  />
           </label>
           { <Dialog open={open} onOpenChange={() => {setFile([]); setOpen(false)}} >
        <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Send Files</DialogTitle>
          <DialogHeader className='w-full overflow-hidden overflow-x-scroll'>
            <DialogDescription className='flex gap-1 w-full'>
              {file.map((imagefile) => {
                const imageUrl = URL.createObjectURL(imagefile);
                return <input type='image' className='h-48' key={imagefile.name} src={imageUrl} alt="I" />;              
              })}
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex justify-between items-center'>
            <span className='text-sm font-medium'>{file.length} files selected</span>
            <Button onClick={async(e) => {e.preventDefault(); await handleFiles(); setOpen(false)}}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>}
        </div>
        <div className='px-4 sm:px-6 w-full'>
            <input type="text" className={`h-10 w-full px-3 text-sm font-medium outline-none bg-[#2a3942] rounded-md ${loading && 'cursor-not-allowed'}`} onChange={(e) => {e.preventDefault(); setMessage(e.target.value)}} placeholder='Type a message' value={message} disabled = {loading} /> 
        </div>
        {message ? <IoMdSend onClick={async(e) => {e.preventDefault(); await handleClick()}} className='cursor-pointer text-xl' size={20}/> : 
            <>
            <FaMicrophone className='cursor-pointer text-xl' onClick={() => {setShowAudioRecorder(true)}} />
            </>}
        </>}
        {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} sendAudio = {sendMessage} recieverId={friend.friendId} />}
    </div>
  )
}
