"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card';

export default function RequestButton({recieverId, friendStatus}: {recieverId?: string, friendStatus: string,}) {
  const [status, setStatus] = useState(friendStatus);
  const handleClick = async() => {
        const response = await fetch(`/api/sendrequest`, {
          method: 'POST',
          body: JSON.stringify({recieverId})
        });
        const json = await response.json();
        if(json.success){
           setStatus(json.message)
        }
        else{
          setStatus(json.error)
        }
  }
  return (
    <>
    {status === "Request" ? <Button className='w-max' onClick={async(e) => {e.preventDefault(); await handleClick()}} >{friendStatus}</Button> : 
    <Card className={`py-1 px-4 ${friendStatus === 'Friends' ? 'text-green-400': friendStatus === 'Sent' ? 'text-orange-300': 'text-slate-300'}`}>{status}</Card> }
    </>
  )
}