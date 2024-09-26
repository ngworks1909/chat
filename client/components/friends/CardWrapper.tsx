import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BackButton from '../BackButton'
import FriendSearchWrapper from './FriendSearchWrapper'
import FriendCardWrapper from './FriendCardWrapper'


export default async function CardWrapper() {

  return (
    <Tabs defaultValue="all" className='h-full w-full overflow-hidden'>
            <div className='flex w-full justify-between'>
            <BackButton/>
            <TabsList className=''>
                <TabsTrigger value="all">Friends</TabsTrigger>
                <TabsTrigger value="add">Add Friend</TabsTrigger>
            </TabsList>
            </div>
            <TabsContent className='flex w-full mt-5' value="all">
                  <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader className='border-b border-border shadow-2xl shadow-border'>
                      <CardTitle>Friends</CardTitle>
                      <CardDescription>
                        View and manage your friends.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='h-[68dvh] overflow-hidden overflow-y-scroll'>
                       <FriendCardWrapper />
                    </CardContent>
                    </Card>
            </TabsContent> 
            <TabsContent className='h-small flex w-full items-center justify-center' value="add">
            <Card className='h-full max-w-[550px] w-[100%] p-4'>
                <div className='flex flex-col'>
                <div className="flex flex-col p-6">
                    <div className='space-y-1'>
                        <h3 className="font-semibold tracking-tight text-2xl">Add friend</h3>
                        <p className="text-sm text-muted-foreground">Enter friend email or mobile to connect</p>
                    </div>
                    <FriendSearchWrapper/>
                </div>
                </div>
            </Card>
            </TabsContent>
        </Tabs>
  )
}
