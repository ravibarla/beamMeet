import React from "react";
import "../globals.css";
import { CiKeyboard } from "react-icons/ci";
import Navbar from "../components/Navbar";
function Homepage() {
  return (
    <div className="flex w-full h-screen justify-center">
      {/*left body*/}
      <div className="flex w-[60%]  justify-center items-center  flex-col">
        <div className="flex w-[60%] p-6 border-b-2 border-gray-400 justify-center items-center  flex-col">
          <strong className="self-start text-4xl subpixel-antialiased">
            <h1>Experience seamless video communication anytime, anywhere .</h1>
          </strong>
          <br />
          <p className="self-start text-2xl">
            Connect with friends, family, or colleagues in high quality. Fast,
            secure, and reliable video chat made easy for everyone.
          </p>
          <div className="flex py-9">
            <button class="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold py-2 px-4 mx-6 rounded">
              New Meeting
            </button>
            <div className="border border-2 rounded-lg border-blue-500 flex justify-center items-center">
              <CiKeyboard size={"3em"} className="py-2" />
              <input
                placeholder="enter a code"
                className="outline-none focus:ring-0"
              />
            </div>
            <button class="text-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-6 rounded">
              Join
            </button>
          </div>
        </div>
      </div>
      {/*right body*/}
      <div className="flex w-[40%]  justify-center items-center">
        <img
          src="/assets/slide-1.jpg"
          alt="Image Description"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default Homepage;
