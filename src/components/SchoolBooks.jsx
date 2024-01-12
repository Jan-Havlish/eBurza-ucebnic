import OneBook from "./OneBook";
import ChoosingBarFromArray from "./ChoosingBarFromArray";
import ucebniceNames from "../data/ucebniceNames";
import useQueryBookRecords from "../services/db/useQueryBookRecords";
import { useState, useEffect } from "react";

const SchoolBooks = () => {
  // console.log(useQueryBookRecords("bookCategory", ["matematika", "fyzika", "chemie"]));

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

      const books = await useQueryBookRecords("bookCategory", [
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

      <div className="cards">
        {books.map((book) => (
          <OneBook
            key={book.id}
            title={book.bookTitle}
            owner={book.ownerName}
            image={book.bookImg}
            {...book}
          />
        ))}
      </div>
    </div>
  );
};

export default SchoolBooks;
