import React, { useState, useEffect } from "react";
import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
} from "react-icons/pi";
import AgreeOnPrice from "./AgreeOnPrice";
import { useUser } from "../contexts/UserContext";
import updateRecord from "../services/db/updateRecord";
import AgreeOnPlaceAndTime from "./AgreeOnPlaceAndTime";

const MessagesWindow = (props) => {
  const { book } = props;
  const {
    ownerName,
    ownerEmail,
    priceRangeFrom,
    priceRangeTo,
    takerEmail,
    taker,
    shoppingState,
  } = book;
  const user = useUser();
  const [userEmail, setUserEmail] = useState("");

  const handleLostInterest = async () => {
    await updateRecord("books", book.BookID, {
      ...book,
      shoppingState: 0,
      suggestedPrice: 0,
      priceAgree: null,
      taker: false,
      takerEmail: "",
      interestLost: true,
      endOfSale: false,
      waitingForResponseFrom: "taker",
      handover: {
        place: "",
        placeAgree: null,
        time: "",
        timeAgree: null,
      },
    });
    console.log("updated");
  };
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  return (
    <div>
      {book.ownerEmail === userEmail && book.interestLost && (
        <h1 className="text-red-600">
          Předchozí zájemce ztratil zájem o knihu.
        </h1>
      )}
      {(ownerEmail === userEmail || takerEmail === userEmail) && taker && (
      <div className="mt-6">
        <h3>Komunikace</h3>
        <br />
        {book.shoppingState !== 3 && (
          <button
            className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded"
            onClick={handleLostInterest}
          >
            Ztratit zájem o knihu
          </button>
        )}
        <ul>
          <li
            className={
              "m-2 border-gray-200 rounded-xl border-2 p-2 " +
              (shoppingState === 1 ? "opacity-100" : "opacity-30")
            }
          >
            <div className="flex row-auto">
              <PiNumberCircleOne size={35} />{" "}
              <h3 className="ml-4 mt-2 mb-2">Domluvit se na ceně</h3>
              <br />
            </div>
            <br />
            <div className="ml-12">
              <AgreeOnPrice
                priceRangeFrom={priceRangeFrom}
                priceRangeTo={priceRangeTo}
                book={book}
                user={user}
              />
            </div>
          </li>
          <li
            className={
              "m-2 border-gray-200 rounded-xl border-2 p-2 " +
              (shoppingState === 2 ? "opacity-100" : "opacity-30")
            }
          >
            <div className="flex row-auto">
              <PiNumberCircleTwo size={35} />{" "}
              <h3 className="ml-4 mt-2 mb-2">
                Domluvit se na místě a času předání
              </h3>
              <br />
            </div>
            <br />
            <div className="ml-12">
              <AgreeOnPlaceAndTime book={book} user={user} />
            </div>
          </li>
          <li
            className={
              "m-2 border-gray-200 rounded-xl border-2 p-2 " +
              (shoppingState === 3 ? "opacity-100" : "opacity-30")
            }
          >
            <div className="flex row-auto">
              <PiNumberCircleThree size={35} />{" "}
              <h3 className="ml-4 mt-2 mb-2">Dokončit</h3>
            </div>
          </li>
        </ul>
      </div>
      )}
      {!taker && (
        <div className="mt-6">
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              updateRecord("books", book.BookID, {
                ...book,
                takerEmail: user.email,
                taker: user.displayName,
                shoppingState: 1,
                interestLost: false,
              })
            }
          >
            Máte zájem o knihu? A chcete se domluvit s prodejcem?
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesWindow;
