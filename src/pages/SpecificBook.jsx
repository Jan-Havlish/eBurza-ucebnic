import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import downloadSpecificDocumentById from "../services/db/downloadSpecificDocumentById";
import ComunitationWindow from "../components/ComunitationWindow";
import NeedToLogin from "../components/NeedToLogin";
import { useUser } from "../contexts/UserContext";

const SpecificBook = () => {
  const user = useUser();
  const { BookID } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const unsubscribe = downloadSpecificDocumentById("books", BookID, (data) => {
      setBook({ ...data, BookID });
    });

    return () => {
      unsubscribe();
    };
  }, [BookID]);

  return (
    <>
      <div className="card">
        <h2>{book?.bookTitle}</h2>
        <h3>{book?.priceRangeFrom} - {book?.priceRangeTo}</h3>
        <h3>{book?.ownerName}</h3>
        <h3>{book?.createdAt}</h3>
        <img src={book?.bookImg} alt={book?.bookTitle} />
        <p className="mt-4 border-gray-300 rounded-xl border-2 p-6 mb-6 w-3/4">
          Popis stavu učebnice:
          <br />
          {book?.bookDescription}
        </p>
      </div>
      <div className="card min-h-screen">
        {(user && book) ? <ComunitationWindow book={book} /> : <NeedToLogin />}
      </div>
    </>
  );
};

export default SpecificBook;
