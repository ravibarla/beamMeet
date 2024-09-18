import LoginBody from "./components/LoginBody";
import Navbar from "./components/Navbar";

import "./globals.css";
export default function Home() {
  return (
    <div className="h-screen flex flex-col ">
      <Navbar />
      <LoginBody />
    </div>
  );
}
