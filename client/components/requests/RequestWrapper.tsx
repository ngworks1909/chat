import React from 'react'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Card } from '../ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BackButton from '../BackButton'
import RequestCardWrapper from './RequestCardWrapper'


export default function RequestWrapper() {
  return (
    // <Tabs defaultValue="all" className='h-full w-full overflow-hidden'>
    //         <div className='flex w-full justify-between'>
    //         <BackButton/>
    //         <TabsList className=''>
    //             <TabsTrigger value="all">Recieved</TabsTrigger>
    //             {/* <TabsTrigger value="add">Sent</TabsTrigger> */}
    //         </TabsList>
    //         </div>
    //         <TabsContent className='flex w-full mt-5' value="add">
    //               <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
    //                 <CardHeader className='border-b border-border shadow-2xl shadow-border'>
    //                   <CardTitle>Requests</CardTitle>
    //                   <CardDescription>
    //                     View and manage your friend requests.
    //                   </CardDescription>
    //                 </CardHeader>
    //                 <CardContent className='h-friendsmall sm:h-friend overflow-hidden overflow-y-scroll'>
    //                    <FriendCardWrapper/>
    //                 </CardContent>
    //                 </Card>
    //         </TabsContent> 
    //         <TabsContent className='h-small flex w-full items-center justify-center' value="all">
    //         <Card className='h-full max-w-[550px] w-[100%] p-4'>
    //             <div className='flex flex-col'>
    //             <div className="flex flex-col p-6">
    //                 <div className='space-y-1'>
    //                     <h3 className="font-semibold tracking-tight text-2xl">Your Requests</h3>
    //                     <p className="text-sm text-muted-foreground">Accept or reject requests of your choice</p>
    //                 </div>
    //                 <RequestCardWrapper/>
    //             </div>
    //             </div>
    //         </Card>
    //         </TabsContent>
    //     </Tabs>

    <>
    <div className='flex w-full justify-between'>
            <BackButton/>
            </div>
            <div className='h-small flex w-full items-center justify-center'>
            <Card className='h-full max-w-[550px] w-[100%] p-4'>
                <div className='flex flex-col'>
                <div className="flex flex-col p-6">
                    <div className='space-y-1'>
                        <h3 className="font-semibold tracking-tight text-2xl">Your Requests</h3>
                        <p className="text-sm text-muted-foreground">Accept or reject requests of your choice</p>
                    </div>
                    <RequestCardWrapper/>
                </div>
                </div>
            </Card>
            </div>
      </>
  )
}
