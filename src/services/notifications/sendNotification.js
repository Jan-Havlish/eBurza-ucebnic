import writeRecord from "../db/writeRecord"
import { useNotification } from "../../contexts/NotificationContext"
import { projectFirestore } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore"; 

const sendNotification = async ({ data }) => {
    const { setNotification, setNotificationType } = useNotification();

    email = data.email
    // check if they have alloved notifications
    const docRef = doc(projectFirestore, "users", email);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return false
    }
    if (!docSnap.data().notifications) {
        return false
    }
    
    writeRecord("notifications", { data }, setNotification, setNotificationType)
    const api = "https://burzaucebnicagkm.eu.pythonanywhere.com/notificate"
    const response = await fetch(api)

    if (response.ok) {
        return true
    }
}

export default sendNotification;