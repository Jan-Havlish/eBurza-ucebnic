import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import OneMessage from "./OneMessage";
import SendMessage from "./SendMessage";

import { projectFirestore } from "../firebase/config";
import {
  updateDoc,
  collection,
  serverTimestamp,
  doc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";

const MessageWindow = ({ book }) => {
  const user = useUser();
  const [userEmail, setUserEmail] = useState("");
  const bookOwner = book.ownerEmail;

  const checkRelevantMessages = (message) => {
    // Pokud je uživatel vlastník knihy
    if (user.email === book.ownerEmail) {
      // Vidí zprávy kde je odesílatelem součastnému zájemci nebo příjemcem od součastného zájemce
      return (
        (message.sender === user.email || message.receiver === user.email) &&
        (message.sender === book.takerEmail ||
          message.receiver === book.takerEmail)
      );
    }

    // Pokud je uživatel současný zájemce
    if (user.email === book.takerEmail) {
      // Vidí pouze zprávy mezi sebou a vlastníkem
      return (
        (message.sender === user.email &&
          message.receiver === book.ownerEmail) ||
        (message.sender === book.ownerEmail && message.receiver === user.email)
      );
    }

    // Jiné případy - neukazovat nic
    return false;
  };
  const unfilteredMessages = book.messages;
  const messages = unfilteredMessages.filter(checkRelevantMessages);

  const returnSendersName = () => {
    console.log(
      "returnSendersName",
      user.email,
      book.ownerEmail,
      book.ownerName,
      book.takerEmail,
      book.taker,
    );
    if (user.email === book.ownerEmail) {
      return book.taker;
    } else if (user.email === book.takerEmail) {
      return book.ownerName;
    }
  };

  const sendersName = returnSendersName();

  console.log(book);

  const isOwner = () => {
    return bookOwner === userEmail;
  };

  console.log(messages, "messages");
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);
  console.log(userEmail);
  console.log(book);

  const reportMessage = async (index) => {
    if (confirm("Chcete nahlásit zprávu?")) {
      const updatedMessages = [...messages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        reported: true,
      };

      try {
        await updateDoc(doc(projectFirestore, "books", book.BookID), {
          messages: updatedMessages,
        });
        console.log(book, "bookvdg");
        const docRef = await addDoc(collection(projectFirestore, "reports"), {
          book: book.BookID,
          by: user.displayName,
          time: serverTimestamp(),
          text: messages[index].text,
        });
      } catch (error) {
        console.error("Chyba při nahlašování zprávy:", error);
      }
    } else {
      console.log("canceled report");
    }
  };

  return (
    <div className="flex flex-col items-end justify-end w-full h-full">
      {messages.map((message, index) => (
        <OneMessage
          key={index}
          text={message.text}
          isAuthor={message.sender === userEmail}
          sender={message.sender === userEmail ? user.displayName : sendersName}
          time={message.send}
          report={() => {
            reportMessage(index);
          }}
        />
      ))}
      <SendMessage col="books" docId={book.BookID} book={book} />
    </div>
  );
};

export default MessageWindow;
