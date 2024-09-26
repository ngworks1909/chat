import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Avatar, AvatarFallback } from '../ui/avatar';
import { CiUser } from 'react-icons/ci';

export default function ContactButtonSkeleton() {
  return (
    <div className='flex gap-2 transition-all border-b items-center pl-3'>
        <Avatar>
        <AvatarFallback><CiUser size={20}/></AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start gap-1 p-3 text-left text-sm">
        <div className="flex w-full flex-col gap-1">
            <div className={`flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-[100px] bg-[#202c33]" /> 
                </div>
                <Skeleton className="h-4 w-[50px] bg-[#202c33]" />
            </div>
        </div> 
        <Skeleton className="h-4 w-[180px] bg-[#202c33]" />
    </div>
    </div>
  )
}