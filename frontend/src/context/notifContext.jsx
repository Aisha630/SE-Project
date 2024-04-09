// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {useSocket} from './socketContext';

// const NotifContext = createContext();

// export const useCart = () => useContext(NotifContext);

// export const NotifProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
      
//   const socket = useSocket();
//   useEffect(() => {
//       socket.on("newBid", (data) => { setNotifications([...notifications, data]);console.log(data)});
//       socket.on("donationRequest", (data) => { setNotifications([...notifications, data]); console.log(data) });
//       socket.on("productSold", (data) => { setNotifications([...notifications, data]); console.log(data)  });

//       return () => {
//           socket.off("newBid");
//           socket.off("donationReq");
//           socket.off("productSold");
//       }
//   }, [socket]);



//   return (
//     <NotifContext.Provider value={{notifications }}>
//       {children}
//     </NotifContext.Provider>
//   );
// };

// export default NotifContext;
