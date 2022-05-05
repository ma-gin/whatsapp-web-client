import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { setUserInfoAction } from "../redux/actions"
import { BsSearch } from "react-icons/bs"
import "../styles/sidebar.css"
import { useDispatch, useSelector } from "react-redux"

export default function SidebarChats() {

  const dispatch = useDispatch()

  const [searchedUsers, setSearchedUsers] = useState(undefined)

  const [chats, setChats] = useState(undefined)

  const user = useSelector((state) => state.loggedUser)

  const URL = process.env.REACT_APP_SEARCH_URL

  const searchChat = async (event) => {
    try {
      // console.log('search')
      const response = await fetch(`${URL}?q=` + event, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setSearchedUsers(data)
      } else {
        console.log("error on fetching users")
        setSearchedUsers(undefined)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createChat = async (e) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_CREATE_CHAT}chats`, {
        method: "POST",
        body: JSON.stringify({ recipient: e }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (response.ok) {
        console.log(response)
      } else {
        console.log("login failed")
        if (response.status === 400) {
          console.log("bad request")
        }
        if (response.status === 404) {
          console.log("page not found")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const existingChats = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CREATE_CHAT}chats`,
        {
          credentials: "include",
        }
      )
      if (response.ok) {
        const data = await response.json()
        setChats(data)
      } else {
        console.log("error on fetching users")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    existingChats()
  }, [searchedUsers])

  return (
    <Container className={"p-0"}>
      <Row className={" p-0"}>
        <Col>
          <div className="search-input d-flex justify-content-center align-items-center mt-3 ps-3 p-1">
            <BsSearch className={"me-1"} />
            <InputGroup className="w-100 m-0 p-0">
              <FormControl
                type="search"
                placeholder="Search"
                className="border-0"
                aria-label="Search chat or start a new one"
                onChange={(e) => searchChat(e.target.value)}
              />
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
      <Col>
          {searchedUsers === "" ||
          searchedUsers === undefined ||
          searchedUsers === " "
            ? null
            : searchedUsers.map((tUser, idx) => (
                <div
                  key={idx}
                  onClick={async () => {
                    await createChat(tUser._id)
                    console.log(tUser)
                    existingChats()
                  }}>
                  {tUser.username}
                </div>
              ))}
        </Col>
      </Row>
      <Row>
      <Col>
          {chats &&
            chats.map((chat, idx) => (
              <div key={idx} className="d-flex mt-2 align-items-center">
                <div
                  key={idx}
                  className="d-flex mt-2 align-items-center"
                >
                  <img
                    src={chat.members[0]._id === user._id ? chat.members[1].avatar : chat.members[0].avatar }
                    alt={"User logo"}
                    className={"user-picture  me-2"}
                  ></img>
                  <p>{chat.members[0]._id === user._id ? chat.members[1].username : chat.members[0].username}</p>
                </div>{" "}
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  )
}