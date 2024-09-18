import React from "react";
import HomeLeftBackground from "./homeLeftBackground";
import LoginForm from "./LoginForm";

const LoginBody = () => {
  return (
    <div
      className="flex w-full bg-gray-600 h-[92%]"
      style={{ backgroundColor: "RGB(232, 228, 217)" }}
    >
      <HomeLeftBackground />
      <LoginForm />
    </div>
  );
};

export default LoginBody;
