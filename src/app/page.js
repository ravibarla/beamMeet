import LoginBody from "./components/LoginBody";
import Navbar from "./components/Navbar";

export default function Home() {

  return (
    <div className="h-screen flex flex-col ">
      <Navbar />
      <LoginBody />
    </div>
  );
}
