import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarChats from "./SidebarChats";
import { Col } from "react-bootstrap";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useMemo } from "react";

const ADDRESS = process.env.REACT_APP_BE_ADDRESS || "http://localhost:3001";

export default function Sidebar() {

  const navigate = useNavigate();
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

  // eslint-disable-next-line no-unused-vars
  const userLogout = () => {
    try {
      fetch(`${process.env.REACT_APP_USERS_URL}session`, {
        method: "DELETE",
        credentials: "include",
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Col md={4}>
      <SidebarHeader />
      <SidebarChats />
    </Col>
  )
}
