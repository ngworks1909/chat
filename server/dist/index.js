"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const httpServer = app.listen(8000);
const wss = new ws_1.WebSocketServer({ server: httpServer });
global.onlineUsers = new Map();
global.activeChats = new Map();
wss.on('connection', (ws) => {
    ws.on('message', (event) => {
        const payload = JSON.parse(event);
        if (payload.action === 'add-user') {
            if (payload.userId) {
                onlineUsers.set(payload.userId, ws);
                activeChats.set(payload.userId, '');
            }
        }
        else if (payload.action === 'active-chat') {
            if (payload.userId) {
                activeChats.set(payload.userId, payload.activeId);
            }
        }
        else if (payload.action === 'send-message') {
            const senderWs = onlineUsers.get(payload.data.senderId);
            if (senderWs) {
                senderWs.send(JSON.stringify({ action: 'add-message', data: payload.data }));
            }
            if (onlineUsers.has(payload.data.recieverId)) {
                const reciverWs = onlineUsers.get(payload.data.recieverId);
                if (reciverWs) {
                    payload.data.messageStatus = activeChats.get(payload.data.recieverId) === payload.data.senderId ? 'Seen' : 'Delivered';
                    reciverWs.send(JSON.stringify({ action: 'recieve-message', data: payload.data }));
                }
            }
        }
    });
    ws.on('close', () => {
        for (const [userId, userWs] of onlineUsers.entries()) {
            if (userWs === ws) {
                onlineUsers.delete(userId);
                break;
            }
        }
    });
});
