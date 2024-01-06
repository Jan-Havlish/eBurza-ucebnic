import React, { useState, useEffect } from "react";
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
      <div className="border-gray-300 rounded-xl border-2 p-6 m-6 bg-gray-900 flex items-center justify-center flex-col h-200">
      <h1>{props.title}</h1>
      <h2>{!props.taker ? "Zatím bez zájemce" : "Zájemce, ještě neujednáno"} </h2>
      {console.log(taker)}
      {console.log((!taker) ? "Zatím bez zájemce" : "Zájemce, ještě neujednáno")}
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
