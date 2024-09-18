import axios from "axios";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8081/api/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log("successfully logged in :", res);
    } catch (err) {
      console.log("error in logging in :", err);
    }
  };
  return (
    <div className="flex w-2/5  justify-center items-start p-[7%]">
      <form>
        <div className="flex justify-center">
          <FaCircleUser size={"4em"} />
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Username
          </span>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            password
          </span>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div
          className="mt-4 block w-full px-3 py-2  border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 justify-center align-center flex text-lg"
          style={{ backgroundColor: "#6C4E31", color: "#FFF8E8" }}
        >
          <button onClick={(e) => handleLogin(e)}>Sign In</button>
        </div>
        <div
          className="mt-4 block w-full px-3 py-2  border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 justify-center align-center flex text-lg"
          style={{ backgroundColor: "#43766C", color: "#FFF8E8" }}
        >
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
