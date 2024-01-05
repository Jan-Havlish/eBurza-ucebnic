import { projectFirestore } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const useQueryBookRecords = async (parameter, inArray) => {

    const q = query(
        collection(projectFirestore, "books"),
        where(parameter, "in", inArray)
    )

    const querySnapshot = await getDocs(q);

    return querySnapshot ? querySnapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    }) : [];

}

export default useQueryBookRecords;