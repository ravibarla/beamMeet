"use client";
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AppContext = createContext();

// AppProvider to wrap around the app and provide global state
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", id: "" });
  const [room, setRoom] = useState({ roomName: "", roomId: "" });

  useEffect(() => {
    // Load from localStorage (if available)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRoom = JSON.parse(localStorage.getItem("room"));
    if (storedUser) setUser(storedUser);
    if (storedRoom) setRoom(storedRoom);
  }, []);

  // Function to login and store user
  const loginUser = (username, id) => {
    const user = { username, id };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Function to create and store room
  const createRoom = (roomName, roomId) => {
    const room = { roomName, roomId };
    setRoom(room);
    localStorage.setItem("room", JSON.stringify(room));
  };

  //function to reset local storage
  const resetLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("room");
    setUser(null);
    setRoom(null);
  };

  return (
    <AppContext.Provider value={{ user, room, loginUser, createRoom }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
