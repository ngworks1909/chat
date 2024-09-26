import React from 'react'
import './loader.css'

export default function MessageSkeleton() {
  return (
    <div className='flex items-center justify-center flex-1'>
        <span className='loader'></span>
    </div>
  )
}