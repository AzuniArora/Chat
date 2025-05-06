import { io } from "socket.io-client";

// Make sure this matches your local IP
const socket = io("http://192.168.70.166:4000");

export default socket;
