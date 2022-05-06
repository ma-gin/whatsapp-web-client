import React, { useEffect, useState } from "react"
import "../styles/sidebar.css"

import { BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { setLoggedUserAction } from "../redux/actions"

export default function SidebarHeader() {
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

          <p>{user.username}</p>
          <div className="d-flex align-items-center ms-auto sidebar-header-icons">
            <BiUser className="header-icon" />
            <AiOutlinePlus className="header-icon" />
            <BsThreeDots className="header-icon" />
          </div>
        </div>
      )}
    </>
  )
}
