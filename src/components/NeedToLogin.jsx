import React from "react";
import { Link } from "react-router-dom";

const NeedToLogin = () => {
  return (
    <>
      <Link to="/login">
        <button className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded">
          Musíte se přihlásit se, pro přístup na tuto část stránky
        </button>
      </Link>
    </>
  );
};

export default NeedToLogin;
