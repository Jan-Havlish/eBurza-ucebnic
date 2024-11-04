import React from 'react'
import { useState, useEffect } from "react";
import { useUser } from '../contexts/UserContext';
import OneMessage from './OneMessage';
import SendMessage from './SendMessage';

const MessageWindow = ({book}) => {
  const user = useUser();
  const [userEmail, setUserEmail] = useState("");
  const messages = book.messages;
  const bookOwner = book.ownerEmail;

  console.log(book);

  const isOwner = () => {
    return book.ownerEmail === userEmail;
  }

  console.log(messages, "messages");
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);
  console.log(userEmail);
  console.log(book);
  return (
    <div className="flex flex-col items-end justify-end w-full h-full">MessageWindow
      {messages.map((message, index) => (
        <OneMessage key={index} text={message.text} isAuthor={message.sender === userEmail} />
      ))}
      <SendMessage col="books" docId={book.BookID} book={book}/>
    </div>
  )
}

export default MessageWindow