import React from 'react'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CiUser } from 'react-icons/ci'
import AcceptButtonGroup from './AcceptButtonGroup';
import { fetchRequests } from '@/actions/fetchRequests';

export default async function RequestCardWrapper() {
  const requests = await fetchRequests();
  return (
    <>
      <div className='flex h-[50dvh] flex-col mt-4 gap-4 overflow-hidden overflow-y-scroll'>
        {!requests ? <div className='h-full flex items-center justify-center'><span>No requests found</span></div> :
        <>
          {requests.map((request, index) => {
            return <>
              <Card className='p-4 flex flex-col gap-6' key={index} >
              <div className='flex items-center gap-4'>
             <Avatar>
                <AvatarImage src= {request.sender.image} />
                <AvatarFallback><CiUser size={20}/></AvatarFallback>
             </Avatar>
            <div className='flex flex-col'>
                <span className='text-sm'>{request.sender.username}</span>
                <span className='text-sm text-[#a2a1a1]'>{request.sender.email}</span>
            </div>
          </div>
            <AcceptButtonGroup requestId={request.requestId} />
          </Card>
            </>
          })}
          </>
       }
      </div>
    </>
  )
}