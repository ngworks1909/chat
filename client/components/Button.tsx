"use client"
import { UserState } from '@/atoms/UserState';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

export default function Button({type} : {type: "Login" | "Signup"}) {
  const {username, email, password, mobile} = useRecoilValue(UserState);
  const router = useRouter();
  const handleSignup = async() => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, username, password, mobile})
    });
    const json = await response.json();
    if(json.success) {
        router.push('/login')
    }
  }
  return (
    <div onClick={type === "Signup" ? async (e) => {e.preventDefault(); await handleSignup()}: async() => {const response = await signIn('credentials', {email: email, password: password, redirect: false}); (!response?.error) && router.push("/")}} className="flex items-center p-6 pt-0">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">{type}</button>
    </div>
  )
}