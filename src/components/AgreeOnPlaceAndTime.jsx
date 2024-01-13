import React, { useState, useEffect } from "react";
import updateRecord from "../services/db/updateRecord";
import { vydejniMista, vydejniCasy } from "../data/vydejniMistaACasy";
import ChoosingBarFromArray from "./ChoosingBarFromArray";
import { useNotification } from "../contexts/NotificationContext";

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

  const handleSend = async (option) => {
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
    console.log("updated");
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
    console.log("updated");
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
              ? "opacity-50"
              : "opacity-100"
          }
        >
          {!book.handover.placeAgree && (
            <ChoosingBarFromArray options={vydejniMista} setResult={setPlace} />
          )}
          {!book.handover.timeAgree && (
            <ChoosingBarFromArray options={vydejniCasy} setResult={setTime} />
          )}
          <button onClick={handleSend} className="">
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
