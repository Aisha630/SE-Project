import React, { useContext, createContext } from "react"
import io from "socket.io-client"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

// i am doing this so that socket is made once and then shared with all components

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const token = useSelector((state) => state.auth.token)
    console.log("Token ", token)
    useEffect(()=>{
        if (token) {
            console.log("Making connection to server")
            const newsocket = io("http://localhost:5003") // connecting to the server at backend
            newsocket.on("connect", () => {
                newsocket.emit("register", token)
                console.log("Connected to server and registered")
            })
            
            console.log("The socket id is ", newsocket)
            newsocket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            setSocket(newsocket)

            return () => {
                newsocket.close();
            };
        }
        else {
            // just making sure any old socket is closed
            if (socket) {
                socket.disconnect();
            }
            setSocket(null);
        }

    }, [token])
   
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext




