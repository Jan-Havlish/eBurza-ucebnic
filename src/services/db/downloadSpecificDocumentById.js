import { onSnapshot, doc } from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";

const downloadSpecificDocumentById = (collection, id, callback) => {
  const docRef = doc(projectFirestore, collection, id);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    callback(doc.data());
  });
  return unsubscribe;
};

export default downloadSpecificDocumentById;