import React, { useEffect, useState } from "react"
import "../styles/sidebar.css"

import { BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { setLoggedUserAction } from "../redux/actions"
import { Dropdown } from "react-bootstrap"

export default function SidebarHeader({ logout }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    userData()
  }, [])

  const dispatch = useDispatch()

  const userData = async (event) => {
    try {
      console.log("search")
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}me`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUser(data)
        dispatch(setLoggedUserAction(data))
      } else {
        console.log("error on fetching users")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user && (
        <div className="d-flex align-items-center sidebar-header">
          <img
            src={user.avatar}
            alt={"User logo"}
            className={"user-picture me-2"}></img>

          <p className="normal-p">{user.username}</p>
          <div className="d-flex align-items-center ms-auto sidebar-header-icons">
            <BiUser className="header-icon" />
            <AiOutlinePlus className="header-icon" />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <BsThreeDots className="header-icon" />{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Change Avatar</Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => {
                    logout()
                  }}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </>
  )
}
