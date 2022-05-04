import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch.jsx";
import SidebarChat from "./SidebarChat";
import { Container, Row, Col, Button } from "react-bootstrap";
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

  const userLogout = () => {
    try {
      fetch(`${process.env.REACT_APP_USERS_URL}session`, {
        method: "DELETE",
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <SidebarHeader />
            <SidebarSearch />
            <SidebarChat />
          </Col>
          <Col md={8}>
            <>
              {/* <div>
                            <Button onClick={() => userLogout()}>Log out</Button>
                        </div> */}
              <div className="d-flex align-items-center border-bottom border-2">
                <img
                  src={
                    "data:image/png;base64,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"
                  }
                  alt={"User logo"}
                  className={"user-picture me-2"}
                ></img>
                <p>Barabba</p>
              </div>
              <div className="chatBack"></div>
              <div className="message d-flex">
                <span className="me-2">emojii</span>
                <span className="me-2">attachment</span>
                <input
                  className="message-input"
                  type="text"
                  placeholder={"type a message..."}
                ></input>
              </div>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
}
