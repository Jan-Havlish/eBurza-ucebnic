import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SetupNotification = () => {
  const user = useUser();
  const [notifications, setNotifications] = useState(false);
  const { setNotification, setNotificationType } = useNotification();

  const hasAllowedNotifications = async () => {
    const docRef = doc(projectFirestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().notifications;
    }
    return false;
  };

  useEffect(() => {
    hasAllowedNotifications().then((data) => {
      setNotifications(data);
    });
  }, []);

  if (!user) {
    return "pls log in";
  }

  const setupNotification = async () => {
    await setDoc(doc(projectFirestore, "users", user.email), {
      notifications: true,
    })
      .then(() => {
        setNotification("Notifikace byly povoleny");
        setNotificationType("success");
        setNotifications(true);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        setNotification("Chyba při povolení notifikací, " + error);
        setNotificationType("error");
      });
  };

  const removeNotification = async () => {
    await setDoc(doc(projectFirestore, "users", user.email), {
      notifications: false,
    });
  };

  return (
    <>
      <button
        className="blue-button disabled:opacity-25"
        onClick={notifications ? removeNotification : setupNotification}
      >
        {!notifications ? "Povolit notifikace" : "Zrušit notifikace"}
      </button>
    </>
  );
};

export default SetupNotification;
