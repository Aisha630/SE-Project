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

    const fetchNotifs = async () => {
        try {
            const response = await fetch(`http://localhost:5003/notif`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (response.ok) {
                setNotifications(data.reverse() || []);
            } else {
                console.error(data.message);
                setNotifications([]);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setNotifications([]);
        }
    };


    const deleteNotifs = (notif) => {
        fetch(`http://localhost:5003/notif/${notif._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                fetchNotifs()
            }
            else if (res.status === 404)
                toast.error("Notification not found")
            else
                toast.error("Failed to delete notification")
        }).catch((err) => {
            toast.error(err)
        })

    }

    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;
        socket.on("fetchNotifs", () => { fetchNotifs(); })

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