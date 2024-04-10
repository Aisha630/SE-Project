import React, { useContext, createContext } from "react"
import io from "socket.io-client"
import { useSelector } from "react-redux"

// i am doing this so that socket is made once and then shared with all components

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext);
const socket = io("http://localhost:5003") // connecting to the server at backend


export const SocketProvider = ({ children }) => {
    const token = useSelector((state) => state.auth.token)
    console.log("Token ", token)

    if (token) {
        socket.on("connect", () => {
            socket.emit("register", token)
            console.log("Connected to server and registered")
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext




