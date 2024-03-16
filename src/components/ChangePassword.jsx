import { useUser } from "../contexts/UserContext";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

const ChangePassword = () => {
  const user = useUser();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Reauthenticate uživatele
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, oldPassword),
      );

      // aktulizovat heslo
      await updatePassword(user, newPassword);

      console.log("Password updated successfully");
    } catch (error) {
      console.log(error, error.code);
    }
  };


  return (
    <div className="border-zinc-300 rounded-xl border-2 p-12 mt-12">
      <form id="changePassword" onSubmit={onSubmit}>
        <h2 className="text-base font-semibold leading-7 text-zinc-900">
          Změnit heslo
        </h2>{" "}
        <br />
        <input
          id="oldPassword"
          type="password"
          placeholder="Staré heslo"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <br />
        <input
          id="newPassword"
          type="password"
          placeholder="Nové heslo"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />{" "}
        <br />
        <button type="submit"
          className="bg-agRed hover:bg-agRed/60 text-white font-bold py-2 px-4 rounded"
        >
          Změnit heslo
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
