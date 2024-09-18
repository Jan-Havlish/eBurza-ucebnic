import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const OneBook = (props) => {
  const taker = props.taker;
  const [email, setEmail] = useState("");
  let user = useUser();

  useEffect(() => {
    if (!user) {
      setEmail("");
    } else {
      setEmail(user.email);
    }
  }, [user])

  return (
    <>
    {console.log((props.shoppingState !== 3) | (props.takerEmail === email) | (props.ownerEmail === email))}
    {console.log(props.shoppingState !== 3)}
    {console.log(props.takerEmail)}
    {console.log(props.ownerEmail)}
    {console.log(email)}
    
    {((props.shoppingState !== 3) | (props.takerEmail === email) | (props.ownerEmail === email)) ? (
      <div className="border-zinc-300 rounded-xl border-2 p-6 m-6 bg-zinc-900 flex items-center justify-center flex-col h-200">
      <h1>{props.title}</h1>
      <h2>{!props.taker ? "Zatím bez zájemce" : "Zájemce, ještě neujednáno"} </h2>
      {console.log(taker)}
      {console.log((!taker) ? `Zatím bez zájemce ${props.title}` : "Zájemce, ještě neujednáno")}
      <p>{props.owner}</p>
      <p>
        {props.priceRangeFrom} - {props.priceRangeTo}
      </p>
      <img src={props.image} alt={props.title} className="" />
      <Link to={`/ucebnice/${props.id}`}>
        <button className="red-button">
          Zobrazit
        </button>
      </Link>
    </div>
    ) : (
      <div></div>
    )}
    
    </>
  );
};

export default OneBook;

OneBook.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  priceRangeFrom: PropTypes.any.isRequired,
  priceRangeTo: PropTypes.any.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  shoppingState: PropTypes.number.isRequired,
  takerEmail: PropTypes.string.isRequired,
  ownerEmail: PropTypes.string.isRequired,
  taker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
}
