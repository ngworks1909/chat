import { atom } from "recoil";

export const UserState = atom({
    key: 'UserState',
    default: {username: 'nithin', email: 'nithin', password: 'nithin', mobile: 'nithin'}
})