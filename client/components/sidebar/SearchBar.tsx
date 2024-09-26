"use client"
import { SearchState } from '@/atoms/SearchState'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function SearchBar() {
  const search = useRecoilValue(SearchState);
  const setSearch = useSetRecoilState(SearchState);

  return (
    <div className='h-[60px] bg-[#00000044] px-3 flex items-center gap-3 w-full'>
        <div className="relative bg-[#202c33] rounded-lg w-full ml-3"> 
        <BiSearch className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
        <input value={search} onChange={(e) => {e.preventDefault(), setSearch(e.target.value)}} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search" />
        </div>
        <div>
          <BsFilter size={20}/>
        </div>
    </div>
  )
}