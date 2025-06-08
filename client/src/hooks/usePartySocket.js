import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export function usePartySocket(roomId, username) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!roomId || !username) return;

    socket = io("http://localhost:5000", {
      query: { roomId, username },
    });

    socket.on("connect", () => {
      console.log("✅ Connected to party socket");
    });

    socket.on("participants", (list) => {
      setParticipants(list);
    });

    socket.on("user-joined", (user) => {
      setParticipants((prev) => [...prev, user]);
    });

    socket.on("user-left", (id) => {
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  return { participants };
}

export default usePartySocket;