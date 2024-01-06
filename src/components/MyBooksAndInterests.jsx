import React, { useEffect, useState } from "react";
import useQueryBookRecords from "../services/db/useQueryBookRecords";
import OneBook from "./OneBook";

const MyBooksAndInterests = (props) => {
  const [myBooks, setMyBooks] = useState([]);
  const [myInterests, setMyInterests] = useState([]);
  const userEmail = props.userEmail;

  console.log(userEmail);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await useQueryBookRecords("ownerEmail", [userEmail]);
      setMyBooks(books);

      const interests = await useQueryBookRecords("takerEmail", [userEmail]);
      setMyInterests(interests);
    };
    fetchBooks();
  }, [userEmail]);
  return (
    <div>
      <h2 className="text-xl m-6 border-b border-agBlue text-agBlue">
        Kde jsem zájemce
      </h2>
      <div className="cards">
        {myInterests.map((interest) => (
          <OneBook
            key={interest.id}
            title={interest.bookTitle}
            owner={interest.ownerName}
            image={interest.bookImg}
            {...interest}
          />
        ))}{" "}
      </div>
      <h2 className="text-xl m-6 border-b border-agBlue text-agBlue">
        Moje knihy
      </h2>
      <div className="cards">
        {myBooks.map((book) => (
          <OneBook
            key={book.id}
            title={book.bookTitle}
            owner={book.ownerName}
            image={book.bookImg}
            {...book}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default MyBooksAndInterests;
