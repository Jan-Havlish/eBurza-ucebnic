import { useState, useEffect } from "react";
import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
} from "react-icons/pi";
import AgreeOnPrice from "./AgreeOnPrice";
import { useUser } from "../contexts/UserContext";
import updateRecord from "../services/db/updateRecord";
import AgreeOnPlaceAndTime from "./AgreeOnPlaceAndTime";
import { useNotification } from "../contexts/NotificationContext";
import Finish from "./Finish";

import PropTypes from "prop-types";

const CommunicationWindow = (props) => {
  const { book } = props;
  const {
    ownerEmail,
    priceRangeFrom,
    priceRangeTo,
    takerEmail,
    taker,
    shoppingState,
  } = book;
  const user = useUser();
  const [userEmail, setUserEmail] = useState("");

  const { setNotification, setNotificationType } = useNotification();

  const handleLostInterest = async () => {
    await updateRecord(
      "books",
      book.BookID,
      {
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
      },
      setNotification,
      setNotificationType
    );
    console.log("updated");
  };
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  return (
    <div className="CommunicationWindow">
      {book.ownerEmail === userEmail && book.interestLost && (
        <h1 className="text-red-600">
          Předchozí zájemce ztratil zájem o knihu.
        </h1>
      )}
      {(ownerEmail === userEmail || takerEmail === userEmail) && taker && (
        <div className="mt-6">
          <h3>Komunikace</h3>
          <br />
          {((book.shoppingState < 3) && (userEmail === takerEmail) ) && (
            <button
              className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded"
              onClick={handleLostInterest}
            >
              Ztratit zájem o knihu
            </button>
          )}
          <ul>
            <div
              className={
                "inside-card " +
                (shoppingState === 1 ? "opacity-100" : "opacity-30")
              }
            >
              <PiNumberCircleOne size={35} />{" "}
              <div className="ml-4 mt-2 mb-2">
                <h3>Domluvit se na ceně</h3>
                <AgreeOnPrice
                  priceRangeFrom={priceRangeFrom}
                  priceRangeTo={priceRangeTo}
                  book={book}
                  user={user}
                />
              </div>
            </div>
            <div
              className={
                "inside-card " +
                (shoppingState === 2 ? "opacity-100" : "opacity-30")
              }
            >
              <PiNumberCircleTwo size={35} />{" "}
              <div className="ml-4 mt-2 mb-2">
                <h3>Domluvit se na místě a času předání</h3>
                <div className="mt-2">
                  <AgreeOnPlaceAndTime book={book} user={user} />
                </div>
              </div>
            </div>

            <div
              className={
                "inside-card " +
                (shoppingState === 3 ? "opacity-100" : "opacity-30")
              }
            >
              <PiNumberCircleThree size={35} />{" "}
              <div className="ml-4 mt-2 mb-2">
                <h3>Dokončit</h3>
                {shoppingState === 3 && <Finish amITaker={takerEmail === userEmail} book={book} />}
              </div>
            </div>
          </ul>
        </div>
      )}
      {!taker && (
        <div className="mt-6">
          {(userEmail !== ownerEmail) &&
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              updateRecord(
                "books",
                book.BookID,
                {
                  ...book,
                  takerEmail: user.email,
                  taker: user.displayName,
                  shoppingState: 1,
                  interestLost: false,
                },
                setNotification,
                setNotificationType
              )
            }
          >
            Máte zájem o knihu? A chcete se domluvit s prodejcem?
          </button>
          }
        </div>
      )}

      {(taker &&((userEmail !== takerEmail)  || (userEmail !== ownerEmail))) ? (
        <h3>Učebnice má aktuálně zájemce.</h3>
      ) : (<h3>Učebnice nemá zájemce.</h3>)}
    </div>

  );
};

export default CommunicationWindow;

CommunicationWindow.propTypes = {
  book: PropTypes.object.isRequired,
  user: PropTypes.object,
  taker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}