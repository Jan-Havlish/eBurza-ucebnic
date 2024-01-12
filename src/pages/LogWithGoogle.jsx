import React from "react";
import signInWithGoogleFunction from "../functions/singInWithGoogle";
import { useNotification } from "../contexts/NotificationContext";

const LogWithGoogle = () => {
  const { setNotification, setNotificationType } = useNotification();
  const alertAndLogin = () => {
    alert("Přihlásit se");
    signInWithGoogleFunction(setNotification, setNotificationType);
  };
  return (
    <div className="card">
      <h1>Přihlásit se pomocí Googlu</h1>
      <br />
      <button onClick={alertAndLogin} className="red-button">
        Přihlásit se
      </button>
    </div>
  );
};

export default LogWithGoogle;
