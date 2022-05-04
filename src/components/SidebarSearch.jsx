import React, { useEffect, useState } from "react"
import {
    FormControl,
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    ListGroup,
} from "react-bootstrap"

import { setUserInfoAction } from '../redux/actions'
import { BsSearch } from 'react-icons/bs';
import "../styles/sidebar.css"
import { useDispatch } from "react-redux";

export default function SidebarSearch() {

    const dispatch = useDispatch();

    const [searchedUsers, setSearchedUsers] = useState(undefined)

    const [chats, setChats] = useState(undefined)

    const URL = process.env.REACT_APP_SEARCH_URL

    const searchChat = async (event) => {
        try {
            console.log('search')
            const response = await fetch(`${URL}?q=` + event, {
                credentials: "include"
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
            console.log('search')
            const response = await fetch(`${process.env.REACT_APP_CREATE_CHAT}chats`, {
                credentials: "include"
            })
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
                    <div className="search-input d-flex justify-content-center align-items-center mt-3 ps-3 p-1" >
                        <BsSearch
                            className={"me-1"} />
                        <InputGroup className="w-100 m-0 p-0">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="border-0"
                                aria-label="Search chat or start a new one"
                                onChange={e => searchChat(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {(searchedUsers === "" || searchedUsers === undefined || searchedUsers === " ") ? <div></div> :
                        searchedUsers.map((user, idx) => (
                            <div key={idx}
                                onClick={async () => { await createChat(user._id); console.log(user); existingChats(); dispatch(setUserInfoAction(user)); }}>{user.username}</div>
                            // <ListGroup>
                            //     <ListGroup.Item>
                            //         <Link to={`/${chat.id}`}>{chat.title}</Link>
                            //     </ListGroup.Item>
                            // </ListGroup>
                        ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    {chats && chats.map((chat, idx) => (
                        <div onClick={()=> dispatch(setUserInfoAction(chat.members[0]))} key={idx} className="d-flex mt-2 align-items-center">
                            <img src={chat.members[0].avatar} alt={"User logo"} className={"user-picture  me-2"} ></img>
                            <p>{chat.members[0].username}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}