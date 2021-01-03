import io from "socket.io-client";
const ENDPOINT = "http://localhost:3001" || process.env.ENDPOINT;
const socket = io(ENDPOINT);
export default socket;