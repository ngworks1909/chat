import { atom } from "recoil";

export const ChatState = atom({
    key: 'ChatState',
    default: {username: '', friendId: '', image: ''}
})