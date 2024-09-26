"use client"
import { UserState } from '@/atoms/UserState';
import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';

type PropTypes = {
    type: "email" | "password" | "text",
    id: string,
    placeholder: string,
    label: string,
    min?: number,
    max?: number
}

export default function Field({type, id, placeholder, label, min, max}: PropTypes) {
    const setUser = useSetRecoilState(UserState);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      let val = e.target.value;
      setUser(prevUser => ({...prevUser, [id]:val}));
    }
  return (
    <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>{label}</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" onChange={handleChange} minLength={min} maxLength={max} id={id} placeholder={placeholder} type={type}/>
    </div>
  )
}