import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useNotification() {
  return useContext(UserContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState("hidden");

    useEffect(() => {
        if (notification !== "hidden") {
            setTimeout(() => {
                setNotificationType("hidden");
            }, 6000);
        }
    }, [notificationType]);

  return (
    <UserContext.Provider value={{ notification, setNotification, notificationType, setNotificationType }}>
      {children}
    </UserContext.Provider>
  );
}