import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import ContactGroup from './ContactGroup'

export default function SidebarWrapper() {
  return (
    <>
      <Navbar/>
      <SearchBar/>
      <div className='flex flex-col bg-[#111b21] h-small sm:h-calc flex-1 overflow-hidden overflow-y-scroll'>
      <ContactGroup />
      </div>
    </>
  )
}
