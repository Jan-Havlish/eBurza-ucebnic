import { useState, useEffect } from "react";
import updateRecord from "../services/db/updateRecord";
import { vydejniMista, vydejniCasy } from "../data/vydejniMistaACasy";
import ChoosingBarFromArray from "./ChoosingBarFromArray";
import { useNotification } from "../contexts/NotificationContext";
import sendNotification from "../services/notifications/sendNotification";

import PropTypes from "prop-types";

const AgreeOnPlaceAndTime = (props) => {
  const { book, user } = props;

  const [place, setPlace] = useState(vydejniMista[0]);

  const { setNotification, setNotificationType } = useNotification();

  useEffect(() => {
    setPlace(book.handover.place.name);
    console.log(book.handover.place);
  }, [book.handover.place]);

  console.log(book.handover.place, place);
  const [time, setTime] = useState(vydejniCasy[0]);

  const handleSend = async () => {
    if (book.shoppingState !== 2) {
      return;
    }

    if (book.waitingForResponseFrom === "owner") {
      console.log("waiting for response from owner");
      return;
    }

    const toLog = {
      ...book,
      waitingForResponseFrom: "owner",
      handover: { ...book.handover, place, time },
    };

    console.log("handling", toLog);

    await updateRecord(
      "books",
      book.BookID,
      {
        ...book,
        waitingForResponseFrom: "owner",
        handover: {
          ...book.handover,
          place: place ? place : book.handover.place,
          time: time ? time : book.handover.time,
        },
      },
      setNotification,
      setNotificationType
    );
    // Send notification to the owner or taker
    await sendNotification({
      data: {
        bookTitle: book.title,
        bookUrl: `https://eburzaucebnicagkm.web.app/ucebnice/${book.BookID}`,
        email: book.ownerEmail === user.email ? book.takerEmail : book.ownerEmail,
        isOwner: book.ownerEmail !== user.email,
      },
    });

    console.log("updated and notification sent");

  };

  const handleDisagreement = async (option) => {
    if (book.waitingForResponseFrom === "taker") {
      console.log("waiting for response from taker");
      return;
    }
    if (book.shoppingState !== 2) {
      return;
    }
    let agrees = [];
    let allAgrees = false;

    console.log(option); // 0

    switch (option) {
      case 0:
        agrees = [false, true];
        break;
      case 1:
        agrees = [true, false];
        break;
      case 2:
        agrees = [false, false];
        break;
      case 3:
        agrees = [true, true];
        allAgrees = true;
        break;
      default:
        agrees = [false, false];
    }

    console.log(agrees); // [false, false]

    await updateRecord(
      "books",
      book.BookID,
      {
        ...book,
        waitingForResponseFrom: "taker",
        handover: {
          ...book.handover,
          placeAgree: agrees[0],
          timeAgree: agrees[1],
        },
        shoppingState: allAgrees ? 3 : 2,
      },
      setNotification,
      setNotificationType
    );


    // Send notification to the owner or taker
    await sendNotification({
      data: {
        bookTitle: book.title,
        bookUrl: `https://eburzaucebnicagkm.web.app/ucebnice/${book.BookID}`,
        email: book.ownerEmail === user.email ? book.takerEmail : book.ownerEmail,
        isOwner: book.ownerEmail !== user.email,
      },
    });

    console.log("updated and notification sent");
  };
  return (
    <div>
      <h1>
        Navrženo: {book.handover.place}, {book.handover.time}
      </h1>
      <h2>
        {book.handover.placeAgree && book.handover.timeAgree
          ? "Vše vyhovuje :)"
          : "Nevyhovuje: "}{" "}
        {!book.handover.placeAgree && "místo"}{" "}
        {!book.handover.timeAgree && " čas"}
      </h2>
      {book.takerEmail === user.email && (
        <div
          className={
            book.waitingForResponseFrom === "owner"
              ? "opacity-50 flex flex-col"
              : "opacity-100 flex flex-col"
          }
        >
          {!book.handover.placeAgree && (
            <ChoosingBarFromArray options={vydejniMista} setResult={setPlace} label="a" />
          )}
          {!book.handover.timeAgree && (
            <ChoosingBarFromArray options={vydejniCasy} setResult={setTime} label="b" />
          )}
          <button onClick={handleSend} className="red-button ">
            Navrhnout
          </button>
        </div>
      )}
      {book.takerEmail !== user.email && (
        <div
          className={
            book.waitingForResponseFrom === "taker"
              ? "opacity-50"
              : "opacity-100"
          }
        >
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDisagreement(0)}
          >
            Nesouhlasit s místem
          </button>{" "}
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDisagreement(1)}
          >
            Nesouhlasit s časem
          </button>{" "}
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDisagreement(2)}
          >
            Nesouhlasit s místem i časem
          </button>
          <button
            className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDisagreement(3)}
          >
            Souhlasit
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default AgreeOnPlaceAndTime;

AgreeOnPlaceAndTime.propTypes = {
  book: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  taker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
}