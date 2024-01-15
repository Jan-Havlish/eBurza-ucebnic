import React from "react";
import { useState } from "react";
import { registerUser } from "../services/auth/registerUser";
import { useNotification } from "../contexts/NotificationContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setNotification, setNotificationType } = useNotification();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, name);
    await registerUser(email, password, name, setNotification, setNotificationType);
  }

  return (
    <div className="card">
      <form className="">
        <div className="space-y-12">
          <div className="border-b border-zinc-300 pb-12">
            <h2 className="text-base font-semibold leading-7">
              Registrace pomocí e-mailu
            </h2>
          </div>

          <div className="border-b border-zinc-300 pb-12">
            

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Vaše jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-agRed sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Vaše E-mailová adresa"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-agRed sm:text-sm sm:leading-6"
                  />
                </div>
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
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-agRed sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={onSubmit}
            className="rounded-md bg-agRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-agRed/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-agRed"
          >
            Přijmout podmínky používání aplikace a registrovat se.
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
