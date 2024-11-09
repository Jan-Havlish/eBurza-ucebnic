import React from "react";

const OneMessage = ({ text, isAuthor, sender, time, report }) => {
  const messageClass = isAuthor ? "agBlue" : "agRed";
  const alignClass = isAuthor ? "self-end" : "self-start";

  const unixTimeToHuman = (timestamp) => {
    var date = new Date(timestamp * 1000);
    return date.toLocaleString("en-GB");
  };

  const sendTime = unixTimeToHuman(time);
  return (
    <div
      className={`p-2 rounded-lg border-2 border-gray-300 w-3/4 bg-${messageClass} text-white ${alignClass} m-2 `}
    >
      <p className="text-xs flex justify-between items-center">
        <span>
          {sender} v {sendTime}
        </span>
        {!isAuthor && <button onClick={report}>Nahlásit</button>}
      </p>

      <p>{text}</p>
    </div>
  );
};

export default OneMessage;
