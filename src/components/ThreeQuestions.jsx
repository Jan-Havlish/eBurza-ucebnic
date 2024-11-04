import { useState} from "react";
import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
} from "react-icons/pi";
import AgreeOnPrice from "./AgreeOnPrice";
import AgreeOnPlaceAndTime from "./AgreeOnPlaceAndTime";
import Finish from "./Finish";

const ThreeQuestions = ({ priceRangeFrom, priceRangeTo, book, user, takerEmail, userEmail, shoppingState,  }) => {

  return (
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
  );
};

export default ThreeQuestions;