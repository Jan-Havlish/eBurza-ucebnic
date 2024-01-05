import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ChangePassword from "../components/ChangePassword";
import { verifyUserEmail } from "../services/auth/registerUser";
import NeedToLogin from "../components/NeedToLogin";

const UserPage = () => {
  const user = useUser();
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="card">
      {!user ? (
        <NeedToLogin />
      ) : (
        <div>
          <button className="red-button mr-12">
            <Link to="/logout" className="text-white no-underline">Odhlásit se</Link>
          </button>
          <button
            className="blue-button"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Změnit heslo
          </button>
          {user.emailVerified ? null : (
            <button
              onClick={() => verifyUserEmail(user)}
              className="blue-button"
            >
              {" "}
              Verifikovat email
            </button>
          )}

          <Link to="/addbook">
            <button className="red-button">
              Přidat učebnici
            </button>
          </Link>
          {showChangePassword && <ChangePassword />}
        </div>
      )}
    </ div>
  );
};

export default UserPage;
