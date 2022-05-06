import React from "react";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function MainChat(props) {
  //useEffect w props.chat
  // fetch /chats/${props.chat}

  const [recipient, setRecipient] = useState(undefined);

  const loggedUser = useSelector((state) => state.loggedUser);

  const chat = useSelector((state) => state.activeChat);

  const existingChats = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CREATE_CHAT}chats/` + chat,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.members[0]._id === loggedUser._id) {
          setRecipient(data.members[1]);
        } else {
          setRecipient(data.members[0]);
        }
      } else {
        console.log("error on fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    existingChats();
  }, [chat]);

  const uploadMedia = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_CREATE_CHAT;

    const inpFile = document.getElementById("media-input");
    const formData = new FormData();
    formData.append("media", inpFile.files[0]);
    console.log("FILE TO  UPLOAD: ", inpFile.files[0]);

    if (inpFile.files[0]) {
      try {
        let response = await fetch(`${apiUrl}chats/media`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (response.ok) {
          let data = await response.json();
          let mediaUrl = data.url;
          console.log(mediaUrl);
          props.setMedia(mediaUrl);
        } else {
          alert("something went wrong! please try again");

          if (response.status === 400) {
            alert("some data was wrong");
          }
          if (response.status === 400) {
            alert("not found");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Col md={8}>
      <>
        {" "}
        {recipient && (
          <div className="d-flex align-items-center border-bottom border-2">
            <img
              src={recipient.avatar}
              alt={"User logo"}
              className={"user-picture me-2"}
            ></img>
            <p>{recipient.username}</p>
          </div>
        )}
        <div className="chatBack">
          {props.messages &&
            props.messages.map((message, i) => (
              <p key={i}>
                {message.content.text}
                {message.content.media}
              </p>
            ))}
        </div>
        <div className="message d-flex">
          <span className="me-2">emojii</span>
          <span className="me-2">
            attachment <input type="file" id="media-input"></input>
          </span>
          <Form
            onSubmit={(e) => {
              props.handleMessage(e);
              uploadMedia(e);
            }}
          >
            <Form.Control
              //disabled={!loggedIn}
              type="text"
              value={props.text}
              onChange={(e) => props.setText(e.target.value)}
            />
          </Form>
          ;
        </div>
      </>
    </Col>
  );
}
