import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from '../ui/button'
  import RemoveFriendButton from './RemoveFriendButton'

export default function Dialog({friendId}: {friendId: string}) {
  return (
    <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='w-max'>Remove Friend</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove your
                  friend and your chats from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <RemoveFriendButton friendId={friendId}/>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}