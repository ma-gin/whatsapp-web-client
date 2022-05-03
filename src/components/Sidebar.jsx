import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarSearch from './SidebarSearch.jsx'
import SidebarChat from './SidebarChat'
import { Container, Row, Col, Button } from 'react-bootstrap'
import "../styles/sidebar.css"
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {

    const navigate = useNavigate()

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
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <SidebarHeader />
                        <SidebarSearch />
                        <SidebarChat />
                    </Col>
                    <Col md={8}>
                        <div>
                            <Button onClick={() => userLogout()}>Log out</Button>
                        </div>
                    </Col>
                </Row>

            </Container>

        </>
    )
}