"use client";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email && !password) {
      console.log("nie udanbe logowanie");
      return;
    }
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "example" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
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
          Log in
        </button>
      </form>
    </main>
  );
}
