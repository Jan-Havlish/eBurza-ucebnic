import { collection, doc, setDoc } from "firebase/firestore"; 
import { projectFirestore } from "../../firebase/config";

const writeRecord = async (collectionName, data) => {
    const colRef = collection(projectFirestore, collectionName);
    await setDoc(doc(colRef), data)
    .then(() => {
        console.log("Document successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    })

}

export default writeRecord