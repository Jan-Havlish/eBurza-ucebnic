import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";

const updateRecord = async (collectionName, documentId, data, setNotification, setNotificationType) => {
    const docRef = doc(projectFirestore, collectionName, documentId);
    await updateDoc(docRef, data)
      .then(() => {
        console.log("Document successfully updated!");
        setNotification("Dokument byl úspěšně aktualizován");
        setNotificationType("success");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setNotification("Chyba při aktualizování dokumentu, " + error);
        setNotificationType("error");
      });
  };

  export default updateRecord