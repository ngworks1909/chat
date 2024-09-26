import { fetchRequestCount } from '@/actions/fetchRequestCount'
import Link from 'next/link';
import React from 'react'
import { CiCircleQuestion } from 'react-icons/ci'

export default async function NavRequestLink() {
  const count = await fetchRequestCount();
  return (
    <Link href={'/requests'} className="flex items-center cursor-pointer justify-between w-full gap-2 px-2 py-1.5">
            <div className='flex gap-2'>
            <CiCircleQuestion size={20}/>
            <span>Requests</span>
            </div>
            {count > 0 && <span className='bg-primary text-black text-xs font-bold h-4 w-4 text-center rounded-full'>{count}</span>}
    </Link>
  )
}