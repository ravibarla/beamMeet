"use client";
import React, { useEffect, useRef, useState } from "react";
import "../globals.css";
import { MdMic } from "react-icons/md";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import io from "socket.io-client";

const ChatRoom = () => {
  const roomId = "66eaf7520570a41fd33ac7d2";
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef([]);
  const socket = useRef(null);
  const peerConnections = useRef({});
  const localStream = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    // Function to create a new peer connection
    const createPeerConnection = (userId) => {
      const pc = new RTCPeerConnection();
      peerConnections.current[userId] = pc;

      pc.ontrack = (event) => {
        if (event.streams[0]) {
          setRemoteStreams((prevStreams) => {
            const updatedStreams = [...prevStreams];
            const existingStreamIndex = updatedStreams.findIndex(
              (stream) => stream.id === event.streams[0].id
            );
            if (existingStreamIndex === -1) {
              updatedStreams.push(event.streams[0]);
            }
            return updatedStreams;
          });
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.send(
            JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
              userId
            })
          );
        }
      };

      return pc;
    };

    socket.current = io("http://localhost:8081");

    socket.current.on("message", async (message) => {
      const data = JSON.parse(message);
      const userId = data.userId;

      if (data.type === "offer") {
        const pc = createPeerConnection(userId);
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.current.send(JSON.stringify({
          type: "answer",
          answer,
          userId
        }));
      } else if (data.type === "answer") {
        const pc = peerConnections.current[userId];
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.type === "candidate") {
        const pc = peerConnections.current[userId];
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream; // Store local stream
        localVideoRef.current.srcObject = stream;
        Object.values(peerConnections.current).forEach((pc) => {
          stream.getTracks().forEach((track) => {
            pc.addTrack(track, stream);
          });
        });
      });

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleToggleMute = () => {
    const audioTrack = localStream.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const handleToggleVideo = () => {
    const videoTrack = localStream.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const handleDisconnect = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    if (socket.current) {
      socket.current.disconnect();
    }
    setCallEnded(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-400">
      <div className="flex-1 bg-blue-400 p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="border border-black p-2">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full border-2 border-black"
            ></video>
          </div>
          {remoteStreams.map((stream, index) => (
            <div key={index} className="border border-black p-2">
              <video
                key={stream.id}
                autoPlay
                className="w-full h-full border-2 border-black"
                ref={(el) => {
                  if (el) {
                    el.srcObject = stream;
                  }
                }}
              ></video>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10%] bg-green-400 flex justify-between items-center px-10">
        <div className="flex border border-black">
          <div className="flex border border-black justify-center items-center px-6">
            {new Date().toDateString()}
          </div>
          <div className="flex border border-black justify-center items-center px-6">
            {roomId}
          </div>
        </div>
        <div className="flex border border-black justify-around">
          <div className="flex border border-black justify-center items-center px-6 rounded-2xl">
            {isMuted ? (
              <FaMicrophoneSlash size={"3em"} onClick={handleToggleMute} />
            ) : (
              <MdMic size={"3em"} onClick={handleToggleMute} />
            )}
          </div>
          <div className="flex border border-black justify-center items-center px-6 rounded-2xl">
            {isVideoOff ? (
              <FaVideoSlash size={"3em"} onClick={handleToggleVideo} />
            ) : (
              <FaVideo size={"3em"} onClick={handleToggleVideo} />
            )}
          </div>
          <div className="flex border border-black justify-center items-center px-6 rounded-2xl">
            <MdCallEnd size={"3em"} onClick={handleDisconnect} />
          </div>
        </div>
        <div className="flex border border-black justify-center items-center px-6 rounded-2xl">
          <FaUserPlus size={"2.5em"} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
