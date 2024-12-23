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
import MessageWindow from "./MessageWindow";
import ThreeQuestions from "./ThreeQuestions";

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

  const addTaker = async () => {
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
      setNotificationType,
    );
    console.log("updated");
  };

  const handleLostInterest = async () => {
    await updateRecord(
      "books",
      book.BookID,
      {
        ...book,
        useMessages: false,
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
      setNotificationType,
    );
    console.log("updated");
  };
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  const isUserInvolved = () => {
    return userEmail === (ownerEmail || takerEmail);
  };

  return (
    <div className="CommunicationWindow w-full">
      {book.ownerEmail === userEmail && book.interestLost && (
        <h1 className="text-red-600">
          Předchozí zájemce ztratil zájem o knihu.
        </h1>
      )}
      {(ownerEmail === userEmail || takerEmail === userEmail) && taker && (
        <div className="mt-6 flex justify-center flex-col">
          <h3 className="text-center">Komunikace</h3>
          {userEmail === ownerEmail && (
            <h4 className="text-center">Aktuální zájemce: {taker}</h4>
          )}
          <br />
          {book.shoppingState < 3 && userEmail === takerEmail && (
            <button
              className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded m-2"
              onClick={handleLostInterest}
            >
              Ztratit zájem o knihu
            </button>
          )}
          <div className="flex flex-col xl:flex-row">
            <MessageWindow book={book} />
            <ThreeQuestions
              priceRangeFrom={priceRangeFrom}
              priceRangeTo={priceRangeTo}
              book={book}
              user={user}
              takerEmail={takerEmail}
              userEmail={userEmail}
              shoppingState={book.shoppingState}
            />
          </div>
        </div>
      )}
      {!taker && (
        <div className="mt-6">
          {userEmail !== ownerEmail && (
            <button
              className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
              onClick={addTaker}
            >
              Máte zájem o knihu? A chcete se domluvit s prodejcem?
            </button>
          )}
        </div>
      )}

      {!isUserInvolved() && taker && <h3>Učebnice má aktuálně zájemce.</h3>}
    </div>
  );
};

export default CommunicationWindow;

CommunicationWindow.propTypes = {
  book: PropTypes.object.isRequired,
  user: PropTypes.object,
  taker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
