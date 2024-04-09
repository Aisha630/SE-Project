import React, { useContext, createContext } from "react"
import io from "socket.io-client"

// i am doing this so that socket is made once and then shared with all components

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext);
const socket = io("http://localhost:5003") // connecting to the server at backend

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext




