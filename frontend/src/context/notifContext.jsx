import React, { useContext, createContext } from "react"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSocket } from "./socketContext"

const NotifContext = createContext(null)

export const useNotif = () => useContext(NotifContext);

export const NotifProvider = ({ children }) => {

    const token = useSelector((state) => state.auth.token)
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        if (token) {
            fetchNotifs()
        }
    }, [token])

    const fetchNotifs = () => {
        fetch(`http://localhost:5003/notif`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok)
                return res.json()
            else {
                // res.json().then(data => toast.error(data.message))
                res.json().then(data => console.log(data.message))

            }
        }).then(data => {

            console.log("notifs are ", data)
            if (data)
                setNotifications(data)
            else
                setNotifications([])
        }).catch((err) => {
            console.log(err)
        })

    }
    
    const deleteNotifs = (notif) => {
        console.log("Deleting notif ", notif._id)
        fetch(`http://localhost:5003/notif/${notif._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log("Got delete notif response ", res)
            fetchNotifs()
        }).catch((err) => {
            toast.error(err)
        })

    }

    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;
        socket.on("fetchNotifs", () => { console.log("Got ping for fetching notifs "); fetchNotifs(); })

        return () => {
            socket.off("fetchNotifs")
        }
    }, [socket]);

    return (
        <NotifContext.Provider value={{ fetchNotifs, notifications, setNotifications, deleteNotifs }}>
            {children}
        </NotifContext.Provider>
    )
}

export default NotifContext




