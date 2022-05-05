import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Sidebar from '../components/Sidebar'
import MainChat from '../components/MainChat'
import "../styles/sidebar.css"


export default function Homepage() {
    return (
        <Container >
            <Row>
                <Sidebar />
                <MainChat />
            </Row>
        </Container>
    )
}

