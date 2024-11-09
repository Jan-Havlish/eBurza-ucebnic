import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { projectFirestore } from "../firebase/config";
import {
  updateDoc,
  collection,
  serverTimestamp,
  doc,
  arrayUnion,
} from "firebase/firestore";

const SendMessage = ({ col, docId, book }) => {
  const [message, setMessage] = useState("");
  const user = useUser();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // Prevent sending empty messages

    try {
      // Vytvoření nové zprávy
      const newMessage = {
        text: message,
        sender: user.email,
        send: Math.floor(Date.now() / 1000), // Unix timestamp v sekundách
        reported: false,
        receiver:
          user.email == book.ownerEmail ? book.takerEmail : book.ownerEmail,
      };

      // Aktualizace dokumentu pomocí arrayUnion
      await updateDoc(doc(projectFirestore, col, docId), {
        messages: arrayUnion(newMessage),
      });

      setMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="border-red-500 border-2 rounded-md p-2 w-full"
    >
      <input
        type="text"
        placeholder="Poslat zprávu..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
      <button
        type="submit"
        className="mt-2 bg-agBlue text-white px-4 py-2 rounded"
      >
        Odeslat
      </button>
    </form>
  );
};

export default SendMessage;
