import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import io from "socket.io-client";
import { useEffect, useMemo } from "react";

const ADDRESS = process.env.REACT_APP_BE_ADDRESS || "http://localhost:3001";

export default function Homepage() {
  const socket = useMemo(
    () =>
      io(ADDRESS, {
        transports: ["websocket"],
        auth: { withCredentials: true },
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log(" 🔛 connected with socket id", socket.id);
    });
  }, [socket]);
  return (
    <Container>
      <Row>
        <Sidebar />
        <MainChat />
      </Row>
    </Container>
  );
}
