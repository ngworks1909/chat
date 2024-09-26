import React from 'react'
import {MdCall} from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import ChatDropDown from './ChatDropDown'

export default function ChatHeaderIcons() {
  return (
    <div className='flex gap-6 items-center '>
      <MdCall  className='text-xl cursor-pointer' />
      <IoVideocam  className='text-xl cursor-pointer' />
      <BiSearchAlt2  className='text-xl hidden sm:block cursor-pointer' />
      <ChatDropDown />
    </div>
  )
}
