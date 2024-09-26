"use client"
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={(e) => {e.preventDefault(); router.push('/')}} className='flex gap-1 pr-8'><ArrowLeft size={20} /> <span>Back</span></Button>
  )
}