export type Friend = {
    userId: string;
    friendId: string;
    last: "None" | "Incoming" | "Outgoing";
    messageType: "text"| "audio" | "video" | "image";
    lastMessage: string;
    lastStatus: "Sent" | "Delivered" | "Seen";
    messageCount: number;
    time: Date;
    friend: {
        email: string;
        image: string;
        mobile: string;
        username: string;
    };
}