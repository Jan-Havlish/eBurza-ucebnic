import queryBookRecords from "./queryBookRecords";

const downloadMyActivity = async (userEmail) => {
  const ownerBooks = await queryBookRecords("ownerEmail", [userEmail]);
  const takerBooks = await queryBookRecords("takerEmail", [userEmail]);

  return {
    ownerBooks,
    takerBooks,
  };
};

const notMyNames = (inputObject) => {
  const ownerBooks = inputObject.ownerBooks;
  const takerBooks = inputObject.takerBooks;

  const clearOwnerBooks = ownerBooks.map((book) => {
    // change takerEmail to "removed" if is not none
    // change takerName to "removed" if is not none

    return {
      ...book,
      takerEmail: book.takerEmail && "removed",
      taker: book.takerName && "removed",
    };
  });

  const clearTakerBooks = takerBooks.map((book) => {
    // change ownerEmail to "removed" if is not none
    // change ownerName to "removed" if is not none

    return {
      ...book,
      ownerEmail: book.ownerEmail && "removed",
      ownerName: book.ownerName && "removed",
    };
  });

  return {
    ownerBooks: clearOwnerBooks,
    takerBooks: clearTakerBooks,
  };
};

export { downloadMyActivity, notMyNames };
