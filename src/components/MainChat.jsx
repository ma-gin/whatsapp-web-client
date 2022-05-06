import React from "react";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Picker from "emoji-picker-react";
import { BsFillEmojiSmileFill } from "react-icons/bs";

export default function MainChat(props) {
  //useEffect w props.chat
  // fetch /chats/${props.chat}

  const [recipient, setRecipient] = useState(undefined);

  const [emoji, setEmoji] = useState(false)

  const loggedUser = useSelector((state) => state.loggedUser);

  const chat = useSelector((state) => state.activeChat);

  const [allMessages, setAllMessages] = useState(undefined)

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

  const existingMessages = async (e) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CREATE_CHAT}chats/` + chat,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
          setAllMessages(data.messages)
      } else {
        console.log("error on fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    existingChats();
    existingMessages()
  }, [chat]);

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
        <div className="chatBack scrollerChat p-2">
          {allMessages &&
            allMessages.map((message, i) => (
              // <>
              <div key={i} className={message.sender === loggedUser._id ?  " message-sent p-2 mb-2" : "message-received  p-2 mb-2"}>{message.content.text}</div>
              //  {props.messages &&
              //   props.messages.map((message, i) => (
              //     <div key={i} className={props.socketMess?.sender && props.socketMess.sender !== loggedUser._id ?  "message-received   p-2 mb-2" : " message-sent p-2 mb-2"}>{message.content.text}</div>
              //   ))}
                // </>
            ))} 
        </div>
        
        <div className="message d-flex">
        
        <div> <span style={{color: "coral", fontSize: "30px"}} onClick={()=>setEmoji(!emoji)}><BsFillEmojiSmileFill></BsFillEmojiSmileFill></span></div>
          <span className="me-2">attachment</span>
          <Form className="w-100" onSubmit={(e)=> {props.handleMessage(e)}}>
            <Form.Control
              //disabled={!loggedIn}
              type="text"
              value={props.text}
              placeholder={"Type a message..."}
              onChange={(e) => {props.setText(e.target.value)}}
            />
          </Form>
  
        </div>
        {emoji &&<span className="me-2 emoji"><Picker onEmojiClick={(e, emojiObj)=> {props.setText(props.text +  emojiObj.emoji)}}></Picker></span>}
      </>
    </Col>
  );
}
