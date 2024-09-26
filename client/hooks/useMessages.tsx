import { ChatState } from "@/atoms/ChatState";
import { MessageLoadingState } from "@/atoms/MessageLoadingState";
import { SocketState } from "@/atoms/SocketState";
import { Message } from "@prisma/client"
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const setLoading = useSetRecoilState(MessageLoadingState);
    const loading = useRecoilValue(MessageLoadingState)
    const { friendId } = useRecoilValue(ChatState);
    const socket = useRecoilValue(SocketState);
    useEffect(() => {
        setLoading(true)
        fetch(`/api/fetchmessages/${friendId}`, {method: 'GET'})
        .then((response) => {
            response.json().then((data) => {
                if(data.success){
                    setMessages(data.messages);
                    
                }
                setLoading(false)
            })
        });

    }, [friendId, setLoading])

    useEffect(() => {
        if(socket){
            socket.onmessage = (event) => {
                const data = event.data;
                const payload = JSON.parse(data);
                if(payload.action === 'recieve-message'){
                    const newMessages = [...messages, payload.data];
                    setMessages(newMessages)
                }
                else if(payload.action === 'add-message'){
                    const newMessages = [...messages, payload.data];
                    setMessages(newMessages)
                    fetch('/api/updatemessage', {method: 'POST', body: JSON.stringify(
                        {
                            messageId: payload.data.messageId, 
                            messageStatus: payload.data.messageStatus,
                            senderId: payload.data.senderId,
                            recieverId: payload.data.recieverId
                        }
                    )})
                }
            }
        }
    }, [messages, socket])

    return {messages: messages || [], loading};

}