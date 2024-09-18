import React from "react";
import "../globals.css";
import { MdMic } from "react-icons/md";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
const ChatRoom = () => {
  let arr = [1, 2, 1, 2];
  return (
    <div className="w-full h-screen flex-col bg-gray-400">
      <div className="flex justify-around  h-[90%] bg-blue-400  items-stretch flex-wrap gap-4 p-4">
        {arr.map((ele, index) => (
          <div
            ket={index}
            className="flex border border-black justify-center items-center p-6 grow  shrink min-w-96 "
          >
            ChatRoom
          </div>
        ))}
      </div>
      <div className="flex h-[10%] bg-green-400 justify-between px-10">
        <div className="flex border border-black">
          <div className="flex border border-black justify-center items-center px-6 ">
            time
          </div>
          <div className="flex border border-black justify-center items-center px-6 ">
            group name
          </div>
        </div>
        <div className="flex border border-black justify-around">
          <div className="flex border border-black justify-center items-center px-6 rounded-2xl">
            <MdMic size={"3em"} />
            {/* <FaMicrophoneSlash /> */}
          </div>
          <div className="flex border border-black justify-center items-center px-6  rounded-2xl">
            <FaVideo size={"3em"} />
            {/* <FaVideoSlash /> */}
          </div>
          <div className="flex border border-black justify-center items-center px-6  rounded-2xl">
            <MdCallEnd size={"3em"} />
          </div>
        </div>
        <div className="flex border border-black  justify-center items-center px-6 rounded-2xl">
          <FaUserPlus size={"2.5em"} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
