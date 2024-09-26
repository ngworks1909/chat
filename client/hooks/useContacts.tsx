import { SearchState } from "@/atoms/SearchState";
import { SocketState } from "@/atoms/SocketState";
import { Friend } from "@/zod/Friend";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


export const useContacts = () => {
    const [contacts, setContacts] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const search = useRecoilValue(SearchState);
    const socket = useRecoilValue(SocketState)

    const session:any = useSession();
    const userId = session.data?.user.id

    

    useEffect(()=>{
        fetch(`/api/fetchcontacts`, {method: "GET"})
        .then((response) => {response.json()
            .then((data) => {setContacts(data.friends); setLoading(false)});
        })
        
      },[]);

    // useEffect(() => {
    //     if(socket){
    //         socket.onmessage = (event) => {
    //             const data = event.data;
    //             const payload = JSON.parse(data);
    //             console.log(payload)
    //             if(payload.action === 'add-message' || payload.action === 'recieve-message'){
    //                 console.log('update-event trigger')
    //                 const message: Message = payload.data;
    //                 console.log('update-contact-event')
    //                 if(message.recieverId === userId){
    //                     const index = contacts.findIndex(contact => contact.friendId === message.senderId )
    //                     if(index !== -1){
    //                         contacts[index].last = "Incoming";
    //                         contacts[index].messageType = message.type;
    //                         contacts[index].lastMessage = message.message;
    //                         contacts[index].time = message.date;
    //                         contacts[index].messageCount += 1;
    //                         contacts[index].lastStatus = message.messageStatus
    //                         const [updatedFriend] = contacts.splice(index, 1);
    //                         contacts.unshift(updatedFriend);
    //                     }
    //                 }
    //                 else{
    //                     const index = contacts.findIndex(contact => contact.friendId === message.recieverId );
    //                     if(index !== -1){
    //                         contacts[index].last = "Outgoing";
    //                         contacts[index].messageType = message.type;
    //                         contacts[index].lastMessage = message.message;
    //                         contacts[index].time = message.date;
    //                         contacts[index].lastStatus = message.messageStatus;
    //                         const [updatedFriend] = contacts.splice(index, 1);
    //                         contacts.unshift(updatedFriend);
    //                     }
    //                 }
    //             }
    //         }
    //     }

    // }, [contacts, socket, userId])
    return {loading, contacts: contacts? contacts.filter((contact) => contact.friend.username.toLowerCase().startsWith(search.toLowerCase())): []};

}