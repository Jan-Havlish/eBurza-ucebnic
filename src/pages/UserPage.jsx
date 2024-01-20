import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ChangePassword from "../components/ChangePassword";
import { verifyUserEmail } from "../services/auth/registerUser";
import NeedToLogin from "../components/NeedToLogin";
import {
  downloadMyActivity,
  notMyNames,
} from "../services/db/downloadMyActivity";
import ButtonDownloadJSON from "../components/ButtonDownloadJSON";
import MyBooksAndInterests from "../components/MyBooksAndInterests";
import { useNotification } from "../contexts/NotificationContext";

const UserPage = () => {
  const user = useUser();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [myActivity, setMyActivity] = useState({});
  const [showMyActivity, setShowMyActivity] = useState(false);
  const { setNotification, setNotificationType } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const result = await downloadMyActivity("agkmburzaucebnic@gmail.com");
      const clearResult = notMyNames(result);
      setMyActivity(clearResult);
    };
    fetchData();
  }, [showMyActivity]);

  return (
    <>
      <div className="card">
        {!user ? (
          <NeedToLogin />
        ) : (
          <div>
            <button className="red-button mr-12">
              <Link to="/logout" className="text-white no-underline">
                Odhlásit se
              </Link>
            </button>
            <button
              className="blue-button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Změnit heslo
            </button>
            {user.emailVerified ? null : (
              <button
                onClick={() => verifyUserEmail(user, setNotification, setNotificationType)}
                className="blue-button"
              >
                {" "}
                Verifikovat email
              </button>
            )}

            <Link to="/addbook">
              <button className="red-button">Přidat učebnici</button>
            </Link>
            <button
              className="blue-button"
              onClick={() => setShowMyActivity(!showMyActivity)}
            >
              Stáhnout moji aktivitu
            </button>

            {showChangePassword && <ChangePassword />}

            {showMyActivity && (
              <div className="border-zinc-300 rounded-xl border-2 p-12 mt-12">
                <ButtonDownloadJSON inputObj={myActivity} />
              </div>
            )}
          </div>
        )}
      </div>
      {user ? <MyBooksAndInterests userEmail={user.email} /> : null}
    </>
  );
};

export default UserPage;
