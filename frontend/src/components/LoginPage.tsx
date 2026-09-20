"use client";

import { useState } from "react";
import useAuth from "../hooks/auth.hooks";
import { useRouter } from "next/navigation";

interface Links {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const LoginPage = () => {
  const navigate = useRouter()
  const { login, submitting, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const links: Links[] = [
    {
      name: "Email",
      placeholder: "Write your email!",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      name: "Password",
      placeholder: "Write your password!",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await login({ email, password });
    navigate.replace("/")
  };

  return (
    <form onSubmit={handleSubmit}>
      {links.map((link: Links, index: number) => {
        return (
          <div key={index} className="py-4 flex flex-col gap-3">
            <h2 className="text-white text-lg font-semibold">
              {link.name} <span className="text-[#FF7F00]">*</span>
            </h2>
            <input
              value={link.value}
              onChange={link.onChange}
              className="bg-white rounded-full pl-3 py-2 placeholder:font-[550] placeholder:text-lg"
              type={link.type}
              placeholder={link.placeholder}
              required
            />
          </div>
        );
      })}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mb-4 bg-[#FF7F00] text-white font-semibold rounded-full py-2.5 mt-4 disabled:opacity-60"
      >
        {submitting ? "Logining..." : "Login"}
      </button>
    </form>
  );
};

export default LoginPage;
