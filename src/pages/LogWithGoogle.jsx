import React from "react";
import signInWithGoogleFunction from "../functions/singInWithGoogle";
import { useNotification } from "../contexts/NotificationContext";

const LogWithGoogle = () => {
  const { setNotification, setNotificationType } = useNotification();
  const alertAndLogin = () => {
    const logIn = confirm("Chcete se prihlášit / REGISTROVAT pomocí Googlu? (Nemáte-li již účet budete registrováni, zvolte zrušit, pokud jste se ještě neseznámi nebo nesouhlasíte s podmínkami používání (V O burze!))");
    if (logIn) {
      signInWithGoogleFunction(setNotification, setNotificationType);
    } else {
      setNotification("Zrušeno");
      setNotificationType("error");
    }
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
