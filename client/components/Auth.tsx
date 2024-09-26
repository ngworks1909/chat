import React from 'react'
import Link from 'next/link'
import Button from './Button';
import Field from './Field';
// import GoogleButton from './GoogleButton';


export default function Auth({type}: {type: "Login" | "Signup"}) {
  return (
    <div className='h-dvh flex items-center w-full justify-center'>
      <div className="flex items-center justify-center [&amp;>div]:w-full">
        <div className="rounded-xl border min-w-[350px] sm:w-[450px] bg-card text-card-foreground shadow">
            <div className="flex flex-col p-6 space-y-1">
                <h3 className="font-semibold tracking-tight text-2xl">{type} to Whatsapp</h3>
                <p className="text-sm text-muted-foreground">{type === "Signup" ? 'Enter your details below to create your account': 'Enter your below below to login your account'}</p>
            </div>
            <div className="p-6 pt-0 grid gap-4">
            {type === "Signup" && <Field type='text' id='username' placeholder='Enter username' label='Username' />}
      <Field type='email' id='email' placeholder='Enter email' label='Email' />
      <Field type='password' id='password' placeholder='Enter password' label='Password' />
      {type === "Signup" && <Field type='text' id='mobile' placeholder='Enter mobile number' label='Mobile' />}
            </div>
            <Button type = {type} />
            <div className='text-center text-sm text-muted-foreground mt-2 pb-6'>
                {type === 'Signup' ? `Already have an account?`: "Don't have an account?"} <Link href={`${type ==='Login' ? '/signup': '/login'}`} className='pl-2 underline'>{type ==='Login'? 'Signup': 'Login'}</Link>
            </div>
        </div>
       </div>
    </div>
  )
}