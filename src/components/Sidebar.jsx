import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarChats from './SidebarChats.jsx'
import Col from 'react-bootstrap/Col'
import "../styles/sidebar.css"
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {

    const navigate = useNavigate()

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