import React, { useEffect} from 'react'
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3001";


const GameBord = () => {
    

    useEffect(() => {
        // const { name, room, budget } = useParams;
        const socket = io(ENDPOINT);
        console.log(socket);
        socket.on("hello", (name) => {
            console.log(name); // world
        });
    }, [])


    return (
        <div>

        </div>
    )
}

export default GameBord
