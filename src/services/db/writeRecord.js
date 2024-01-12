import { collection, doc, setDoc } from "firebase/firestore"; 
import { projectFirestore } from "../../firebase/config";

const writeRecord = async (collectionName, data, setNotification, setNotificationType) => {
    const colRef = collection(projectFirestore, collectionName);
    await setDoc(doc(colRef), data)
    .then(() => {
        console.log("Document successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
        setNotification("Chyba při uložení dokumentu, " + error);
        setNotificationType("error");
    })

}

export default writeRecord