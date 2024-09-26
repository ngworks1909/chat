"use client"
import React from 'react'
import ContactSearchWrapper from './ContactSearchWrapper';
import { Friend } from '@prisma/client';
import { useContacts } from '@/hooks/useContacts';


export default function FriendCardWrapper() {
  const {contacts} = useContacts()
  return (
    <>
      {contacts.length === 0 ? <div className='h-full flex items-center justify-center'>
        <span>You have no friends</span>
      </div> : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 gap-x-4 gap-y-6'> 
        {contacts.map((contact: Friend, index: number) => {
            return <ContactSearchWrapper contact={contact} key={index} />   
        })}
    </div>}
    </>
  )
}