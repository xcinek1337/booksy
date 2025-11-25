"use client";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [registerMode, setRegisterMode] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Nieudane logowanie/rejestracja");
      return;
    }

    // plan for tommorow
    // rewrite form with useForm?
    // jwt token
    const endpoint = registerMode ? "/api/auth/register" : "/api/auth/login";
    const body = { email, password };

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!registerMode && data.userExist) {
      setRegisterMode(true);
      return;
    }
    if (registerMode && data.userExist) {
      alert("taki mail jest w uzyciu");
      return;
    }

    // to do smth
  };

  return (
    <main className="flex justify-center  w-full min-h-screen bg-[#ebebeb]">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full mt-5 bg-white max-w-96 mx-auto rounded-lg shadow-sm p-5"
      >
        <div>
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button className="border-2 border-amber-500 px-4 py-2" type="submit">
          {registerMode ? "Register" : "Log in"}
        </button>
      </form>
    </main>
  );
}
