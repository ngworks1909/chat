import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { HiDotsVertical } from "react-icons/hi";
import CloseChat from './CloseChat';


export default function ChatDropDown() {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <HiDotsVertical className="hover:bg-hovered h-10 w-10 p-3 rounded-full"/>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-52 absolute right-0">
    //     <DropdownMenuGroup>
    //       <DropdownMenuItem>
    //         <div className="flex items-center gap-2">
    //         <span>Contact Info</span>
    //         </div>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //       <Link href={'/conversations'} className="flex items-center gap-2">
    //         <span>Close Chat</span>
    //         </Link>
    //       </DropdownMenuItem>
          
    //     </DropdownMenuGroup>
        
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <DropdownMenuItem>
    //       <div className="flex items-center gap-2">
    //         <span>Clear Chat</span>
    //         </div>
    //       </DropdownMenuItem>
    //       <DropdownMenuItem>
    //       <div className="flex items-center gap-2">
    //         <span>Delete Chat</span>
    //         </div>
    //       </DropdownMenuItem>
    //     </DropdownMenuGroup>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>
    //     <div className="flex items-center gap-2">
    //         <span>Remove Friend</span>
    //     </div>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='outline-none'>
        <HiDotsVertical className="text-lg cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 absolute right-0">
        <DropdownMenuGroup>
          <DropdownMenuItem className='p-0 w-full'>
            <div className="flex items-center w-full gap-2 px-2 py-1.5">
            <span>Contact Info</span>
            </div>
          </DropdownMenuItem>
          <CloseChat/>
          
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='p-0 w-full'>
          <div className="flex items-center w-full gap-2 px-2 py-1.5">
              <span>Clear Chat</span>
          </div>
          </DropdownMenuItem>
          <DropdownMenuItem className='p-0 w-full'>
          <div className="flex items-center w-full gap-2 px-2 py-1.5">
             <span>Delete Chat</span>
          </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-0'>
        <div className="flex items-center w-full gap-2 px-2 py-1.5">
             <span>Remove Friend</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}