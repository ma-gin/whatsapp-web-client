import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import io from "socket.io-client";
import { useEffect, useMemo } from "react";
import { useState } from "react";

const ADDRESS = process.env.REACT_APP_BE_ADDRESS || "http://localhost:3001";

export default function Homepage() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");

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

      socket.on("incomingMessage", ({ newMessage }) => {
        console.table({ newMessage });
        setMessages((messages) => [...messages, newMessage]);
      });
    });
  }, [socket]);

  const handleMessage = (e) => {
    e.preventDefault();
    console.log("handleMessage", text);
    const data = {
      content: { text: text },
      //timestamp is added by DB
      //not sending "sender" at all - this will be retrieved at the backend from cookie
    };
    //let chatId2 = "62739dfb95818ef28cf6a8e3";
    socket.emit("outgoingMessage", { data, chat });
    setMessages((m) => [...m, data]);

    setText("");
  };

  return (
    <Container>
      <Row>
        <Sidebar chat={chat} setChat={setChat} />
        <MainChat
          text={text}
          setText={setText}
          handleMessage={handleMessage}
          messages={messages}
        />
      </Row>
    </Container>
  );
}
