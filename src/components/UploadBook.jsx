import resizeImage from "../functions/resizeImage";
import uploadPictureToStorage from "../services/storage/uploadPictureToStorage";
import { useState, useEffect } from "react";
import ucebniceNames from "../data/ucebniceNames";
import { useUser } from "../contexts/UserContext";
import NeedToLogin from "./NeedToLogin";
import writeRecord from "../services/db/writeRecord";
import getCurrentDateTime from "../functions/getCurrentDateTime"
import { useNotification } from "../contexts/NotificationContext";

const UploadBook = () => {
  const user = useUser();
  const { setNotification, setNotificationType } = useNotification();

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceRangeFrom, setPriceRangeFrom] = useState("");
  const [priceRangeTo, setPriceRangeTo] = useState("");
  const [bookCategory, setBookCategory] = useState("Angličtina");
  const [pictureOfBook, setPictureOfBook] = useState(null);
  
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = selectedFile;
    const image = await resizeImage(file, 300, 300);
    const pictureBook = await uploadPictureToStorage(image, setNotification, setNotificationType);
    setPictureOfBook(pictureBook);
  };

  useEffect(() => {
    console.log("useEffect", pictureOfBook);
    if (!pictureOfBook) return;
    const book = {
      useMessages: false,
      messages:[{}],
      bookCategory,
      ownerName: displayName,
      ownerEmail: email,
      bookTitle: title,
      bookDescription: description,
      bookImg: pictureOfBook,
      priceRangeFrom: priceRangeFrom,
      priceRangeTo: priceRangeTo,
      shoppingState: 0,
      suggestedPrice: 0,
      priceAgree: null,
      taker: false,
      takerEmail: "",
      interestLost: false,
      stillOnSale: true,
      waitingForResponseFrom: "taker",
      handover: {
        place: "",
        placeAgree: null,
        time: "",
        timeAgree: null,
      },
      createdAt: getCurrentDateTime(),
    };

    console.log(book);
    console.log("uploading");
    writeRecord("books", book, setNotification, setNotificationType);
    console.log("uploaded");
  }, [pictureOfBook]);
  return (
    <>
      {!user ? (
        <NeedToLogin />
      ) : (
          <form className="card" onSubmit={handleSubmit} id="Nahrát učebnici">
            <h1> Nahrát učebnici </h1>
            <input
              id="titulek"
              type="text"
              placeholder="Titulek"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <br />
            <select
              id="kategorie"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
            >
              {ucebniceNames.map((ucebniceName) => (
                <option key={ucebniceName} value={ucebniceName}>
                  {" "}
                  {ucebniceName}{" "}
                </option>
              ))}
            </select>
            <br />
            <input
              id="popis"
              type="text"
              placeholder="Popis"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />{" "}
            <br />
            <input
              id="cenaStart"
              type="number"
              placeholder="Cena od"
              value={priceRangeFrom}
              onChange={(e) => setPriceRangeFrom(e.target.value)}
            />{" "}
            <br />
            <input
              id="cenaEnd"
              type="number"
              placeholder="Cena do"
              value={priceRangeTo}
              onChange={(e) => setPriceRangeTo(e.target.value)}
            />{" "}
            <br />
            <input
              id="fotografie"
              type="file"
              className="text-zinc-300"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />{" "}
            <br />
            <button className="red-button" type="submit">Nahrát</button>
          </form>
      )}
    </>
  );
};

export default UploadBook;
