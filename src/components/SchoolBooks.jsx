import OneBook from "./OneBook";
import ChoosingBarFromArray from "./ChoosingBarFromArray";
import ucebniceNames from "../data/ucebniceNames";
import queryBookRecords from "../services/db/queryBookRecords";
import { useState, useEffect } from "react";

const SchoolBooks = () => {
  // console.log(queryBookRecords("bookCategory", ["matematika", "fyzika", "chemie"]));

  const [choosedCategory, setChoosedCategory] = useState("Angličtina");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      console.log(
        choosedCategory,
        "choosedCategory",
        typeof choosedCategory,
        "typeof choosedCategory"
      );

      const books = await queryBookRecords("bookCategory", [
        choosedCategory,
      ], true);

      console.log(books, "books");
      setBooks(books);
    };
    fetchBooks();
  }, [choosedCategory]);

  console.log(books);

  return (
    <div className="">
      <div className="card">
        <ChoosingBarFromArray
          options={ucebniceNames}
          setResult={setChoosedCategory}
          label="Vyberte kategorii učebnic"
        />
      </div>
    {books && <div className="cards">
      {console.log(books, "books", typeof books)}
        {books.map((book) => (
          
          <OneBook
            key={book.id}
            title={book.bookTitle}
            owner={book.ownerName}
            image={book.bookImg}
            priceRangeFrom={book.priceRangeFrom}
            priceRangeTo={book.priceRangeTo}
            {...book}
          />
        ))}
      </div>}
    </div>
  );
};

export default SchoolBooks;
