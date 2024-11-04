import React from 'react';

const OneMessage = ({ text, isAuthor }) => {
  const messageClass = isAuthor ? 'agBlue' : 'agRed';
  const alignClass = isAuthor ? 'self-end' : 'self-start';

  return (
    <div className={`p-2 rounded-lg border-2 border-gray-300 w-3/4 bg-${messageClass} text-white ${alignClass} m-2 `}>
      <p>{text}</p>
    </div>
  );
};

export default OneMessage;
