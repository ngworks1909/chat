"use client"
import React from 'react'
import Link from 'next/link'
import Contact from './Contact'
import { useContacts } from '@/hooks/useContacts'
import { Friend } from '@/zod/Friend'
import { useRecoilValue } from 'recoil'
import { SearchState } from '@/atoms/SearchState'
import ContactButtonSkeleton from '../skeletons/ContactButtonSkeleton'

export default function ContactGroup() {
  
  const {loading, contacts} = useContacts();
  const search = useRecoilValue(SearchState);
  return (
    <>
      {loading && <>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
        <ContactButtonSkeleton/>
      </>}
      {!loading && contacts.length === 0 ? <div className='flex items-center h-full justify-center'>
         {search ? <span>No results found</span>: <Link href={'/friends'}>Add friends to chat</Link>}
      </div> : !loading &&  contacts.map((contact: Friend, index: number) => {
        return <Contact key={index} contact = {contact}/>
      })}
    </>
  )
}