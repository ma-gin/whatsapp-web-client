import React from 'react'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function MainChat() {

    const [recipient, setRecipient] = useState(undefined)

    const loggedUser = useSelector((state) => state.loggedUser)
  
    const chat = useSelector((state) => state.activeChat)


    const existingChats = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_CREATE_CHAT}chats/` +  chat,
            {
              credentials: "include",
            }
          )
          if (response.ok) {
            const data = await response.json()
            if(data.members[0]._id === loggedUser._id){
            setRecipient(data.members[1])} else{
              setRecipient(data.members[0])
            }
          } else {
            console.log("error on fetching users")
          }
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{
          existingChats()
      }, [chat])
    

    return (

        <Col md={8}>
            <> {recipient &&                
                <div className="d-flex align-items-center border-bottom border-2">

                    <img src={recipient.avatar} alt={"User logo"} className={"user-picture me-2"} ></img>
                    <p>{recipient.username}</p>
                </div>
                }
                <div className="chatBack" >

                </div>
                <div className='message d-flex'>
                    <span className="me-2">emojii</span>
                    <span className="me-2">attachment</span>
                    <input className='message-input' type="text" placeholder={"type a message..."}></input>
                </div>
            </>
        </Col>
    )
}

