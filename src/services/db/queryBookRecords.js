import { projectFirestore } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const queryBookRecords = async (parameter, inArray, stillOnSale = null) => {
  let q;

  if (stillOnSale === null) {
    q = query(
      collection(projectFirestore, "books"),
      where(parameter, "in", inArray)
    );
  } else {
    q = query(
      collection(projectFirestore, "books"),
      where(parameter, "in", inArray),
      where("stillOnSale", "==", stillOnSale)
    );
  }

  const querySnapshot = await getDocs(q);

  return querySnapshot
    ? querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      })
    : [];
};

export default queryBookRecords;
