"use client";
import React, { useState } from "react";
import "../globals.css";
import { CiKeyboard } from "react-icons/ci";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/Context";
import { useRouter } from "next/navigation";
import axios from "axios";
function Homepage() {
  const router = useRouter();
  const { user, room, loginUser, createRoom } = useAppContext();
  const [roomName, setRoomName] = useState("");
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    let id = user.id || null;
    try {
      const res = await axios.post(`http://localhost:8081/api/create/${id}`);
      if (res.data.data) {
        const { roomName, roomId } = res.data.data;
        console.log("roomName :", roomName);
        createRoom(roomName, roomId);
        router.push("/chatroom");
      }
    } catch (err) {
      console.log("error :", err);
    }
  };
  const handeJoinRoom = async (e) => {
    e.preventDefault();
    let id = user.id || null;
    try {
      const res = await axios.post(
        `http://localhost:8081/api/${id}/join/${roomName}`
      );
      if (res) {
        router.push("/chatroom");
      }
    } catch (err) {
      console.log("error :", err);
    }
  };
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
            <button
              onClick={(e) => handleCreateRoom(e)}
              className="bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold py-2 px-4 mx-6 rounded"
            >
              New Meeting
            </button>
            <div className="border border-2 rounded-lg border-blue-500 flex justify-center items-center">
              <CiKeyboard size={"3em"} className="py-2" />
              <input
                placeholder="enter a code"
                className="outline-none focus:ring-0"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <button
              className="text-blue-500  font-bold py-2 px-4 mx-6 rounded"
              onClick={(e) => handeJoinRoom(e)}
            >
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
