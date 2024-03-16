import { useState, useEffect } from "react";
import updateRecord from "../services/db/updateRecord";
import { useNotification } from "../contexts/NotificationContext";
import PropTypes from "prop-types";

const AgreeOnPrice = (props) => {
  const { priceRangeFrom, priceRangeTo } = props;
  const [suggestedPrice, setSuggestedPrice] = useState(20);

  useEffect(() => {
    setSuggestedPrice(Math.floor((parseFloat(priceRangeFrom) + parseFloat(priceRangeTo)) / 2));
    console.log(priceRangeFrom, priceRangeTo, (priceRangeFrom + priceRangeTo) / 2, "priceRangeFrom, priceRangeTo");
  }, [priceRangeFrom, priceRangeTo]);

  const { setNotification, setNotificationType } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.book.waitingForResponseFrom === "owner") {
      console.log("waiting for response from owner");
      return;
    }
    if (props.book.shoppingState !== 1) {
      return;
    }
    await updateRecord("books", props.book.BookID, {
      ...props.book,
      suggestedPrice,
      waitingForResponseFrom: "owner",
    }, setNotification, setNotificationType);
    console.log("updated");
  };

  const handleAgree = async (option) => {
    if (props.book.waitingForResponseFrom === "taker") {
      console.log("waiting for response from taker");
      return;
    }
    if (props.book.shoppingState !== 1) {
      return;
    }
    await updateRecord("books", props.book.BookID, {
      ...props.book,
      waitingForResponseFrom: "taker",
      priceAgree: option,
      shoppingState: option ? 2 : 1,
    }, setNotification, setNotificationType);
    console.log("updated");
  };

 

  console.log(props.book);

  return (
    <div>
      <h1>Čeká se na odpověď od {props.book.waitingForResponseFrom}</h1>
      {props.book.ownerEmail === props.user.email ? (
        <div
          className={
            props.book.waitingForResponseFrom === "taker" ? "opacity-50" : ""
          }
        >
          <h2>Byla navrhnuta cena: {props.book.suggestedPrice} Kč</h2>
          <br />
          <button
            className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAgree(true)}
          >
            Souhlasit
          </button>{" "}
          <button
            className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAgree(false)}
          >
            Zamítnout
          </button>
        </div>
      ) : (
        <div
          className={
            props.book.waitingForResponseFrom === "owner" ? "opacity-50" : ""
          }
        >
          <h2>Navrhujete cenu:</h2>
          <form id="range" onSubmit={handleSubmit}>
            <label htmlFor="rangeChooser" className="sr-only">Rozsah cen: {priceRangeFrom} - {priceRangeTo} Kč</label>
            <input
              id="rangeChooser"
              type="number"
              min={priceRangeFrom}
              max={priceRangeTo}
              value={suggestedPrice}
              onChange={(e) => setSuggestedPrice(e.target.value)}
              className="text-agBlue"
            />
            <button
            type="submit"
              className="bg-agBlue hover:bg-agBlue/60 text-white font-bold py-2 px-4 rounded"
            >
              Navrhnout
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AgreeOnPrice;

AgreeOnPrice.propTypes = {
  book: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  taker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  priceRangeFrom: PropTypes.any.isRequired,
  priceRangeTo: PropTypes.any.isRequired,  
}