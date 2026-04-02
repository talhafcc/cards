import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/network";

let socket;

export function getSocket() {
  return socket;
}

export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}
