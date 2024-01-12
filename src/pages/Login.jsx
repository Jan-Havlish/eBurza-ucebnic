import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useUser } from "../contexts/UserContext";
import { resetPassword } from "../services/auth/registerUser";
import { FcGoogle } from "react-icons/fc";
import { useNotification } from "../contexts/NotificationContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useUser();

  const navigate = useNavigate();

  const { setNotification, setNotificationType } = useNotification();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/user");
      }
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setNotification("Chyba při přihlašování, " + errorMessage);
        setNotificationType("error");
      });
  };
  return (
    <div>
      <form className="card login">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7">Přihlášení</h2>
          </div>
        </div>
        <div className="m-10 flex justify-center border-b-2 border-gray-900/10 mb-10 p-12">
          <Link
            to="/login/google"
            className="sm:col-span-4 flex items-center justify-center m-full"
          >
            <FcGoogle className="text-4xl" />
          </Link>
        </div>
        <div className="sm:col-span-4 mt-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Vaše E-mailová adresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="sm:col-span-4">
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Zadejte heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={onSubmit}
            className="rounded-md bg-agRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-agRed/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-agRed"
          >
            Přihlásit se
          </button>
        </div>
        <div className="text-center border-t-2 border-gray-900/10 mt-2">
          <p>
            {" "}
            nebo se můžete registrovat{" "}
            <Link
              to="/register"
              className="cursor-pointer hover:text-sky-300 text-agRed"
            >
              zde
            </Link>{" "}
          </p>
          <p>
            nebo zresetovat heslo{" "}
            <a
              onClick={() => resetPassword(email)}
              className="cursor-pointer hover:text-sky-300 text-agRed"
            >
              zde
            </a>{" "}
            (vyplňte e-mail prosím)
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
