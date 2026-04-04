import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/network";

let socket;

export function getSocket() {
  return socket;
}

export function connectSocket() {
  if (!socket) {
    console.log("Creating socket connection to:", SOCKET_URL);
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  if (!socket.connected) {
    console.log("Attempting to connect socket...");
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}
