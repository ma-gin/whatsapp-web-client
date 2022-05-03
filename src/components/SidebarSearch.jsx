import React, { useState } from "react"
import {
    FormControl,
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    ListGroup,
} from "react-bootstrap"
import { BsSearch } from 'react-icons/bs';
import "../styles/sidebar.css"


export default function SidebarSearch() {

    const [search, setSearch] = useState("")

    const URL = ""

    const searchChat = async () => {
        try {
            console.log('search')
            const response = await fetch(`URL${search}`)
            if (response.ok) {
                const { data } = await response.json()
                setSearch(data)
                console.log(data)
            } else {
                console.log("error on fetching users")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className={"p-0"}>
            <Row className={" p-0"}>
                <Col>
                    <div className="search-input d-flex justify-content-center align-items-center mt-3 ps-3 p-1" >
                        <BsSearch
                            onClick={e => searchChat(search)} className={"me-1"} />
                        <InputGroup className="w-100 m-0 p-0">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="border-0"
                                aria-label="Search chat or start a new one"
                                onChange={e => setSearch(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* {data.map(song => (
                        <ListGroup>
                            <ListGroup.Item>
                                <Link to={`/${chat.id}`}>{chat.title}</Link>
                            </ListGroup.Item>
                        </ListGroup>
                    ))} */}
                </Col>
            </Row>
        </Container>
    )
}


