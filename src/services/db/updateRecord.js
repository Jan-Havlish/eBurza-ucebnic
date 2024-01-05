import { doc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";

const updateRecord = async (collectionName, documentId, data) => {
    const docRef = doc(projectFirestore, collectionName, documentId);
    await updateDoc(docRef, data)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  export default updateRecord