import React, { useContext, createContext } from "react"
import io from "socket.io-client"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSocket } from "./socketContext"

// i am doing this so that socket is made once and then shared with all components

const NotifContext = createContext(null)

export const useNotif = () => useContext(NotifContext);

export const NotifProvider = ({ children }) => {

    const token = useSelector((state) => state.auth.token)
    const [notifications, setNotifications] = useState({});
    // const [readNotifs, setReadNotifs] = useState(0)
    // console.log("Token in notif context is ", token)

    useEffect(()=>{
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
                res.json().then(data => toast.error(data.message))
            }
        }).then(data => {

            console.log("notifs are ", data)
                setNotifications(data)
        }).catch((err) => {
            console.log(err)
        })

    }

    const deleteNotifs = (notif) => {
        fetch(`http://localhost:5003/notif/${notif._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                setNotifications((notifs) => notifs.filter((notification) => notification !== notif))
                toast.success("Notification delete successfully")
            }
            else {
                res.json().then((data) => { toast.error(data.message) })
            }
        }).catch((err) => {
            toast.error(err)
        })

    }

    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;
        socket.on("fetchNotifs", () => { fetchNotifs(); console.log("Got ping for fetching notifs ") })

        return () => {
            socket.off("fetchNotifs")
        }
    }, [socket]);

    return (
        <NotifContext.Provider value={{ fetchNotifs, deleteNotifs, notifications, setNotifications }}>
            {children}
        </NotifContext.Provider>
    )
}

export default NotifContext




