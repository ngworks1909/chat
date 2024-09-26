import { fetchImage } from '@/actions/fetchImage';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiUser } from "react-icons/ci";
import React from 'react'


export default async function NavHeader() {
    const image = await fetchImage();
    
    return (
        <>
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback><CiUser size={20}/></AvatarFallback>
          </Avatar>
        </>
    )
}