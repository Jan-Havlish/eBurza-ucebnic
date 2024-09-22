import { messaging, public_vapid_key } from "../firebase/config";
import { getToken } from "firebase/messaging";
import writeRecord from "../services/db/writeRecord"
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

const SetupNotification = () => {
    const user = useUser();
    const { setNotification, setNotificationType } = useNotification();
    
    if (!user) {return "pls log in"}
// https://www.youtube.com/watch?v=P51dI2y7QHA&t=2s
    const setupNotification = () => {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
            getToken(messaging, { vapidKey: public_vapid_key }).then((currentToken) => {
              if (currentToken) {
                console.log("current token for client: ", currentToken)
                // Send the token to your server and update the UI if necessary
                // ...
                writeRecord("notifications", {
                  userEmail: user.email,
                  token: currentToken,
                  createdAt: new Date().toISOString()
                }, setNotification, setNotificationType)
              } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
              }
            }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
              // ...
            });
            
          }
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    return <button className="blue-button" onClick={setupNotification}>
    Povolit notifikace
  </button>
}



export default SetupNotification;