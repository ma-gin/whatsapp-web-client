import React from 'react'
import "../styles/sidebar.css"

import { BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

export default function SidebarHeader() {
    return (
        <div className="d-flex align-items-center">
            <img src={"https://picsum.photos/50/50"} alt={"User logo"} className={"user-pic me-auto"} ></img>
            <div className="d-flex align-items-center ms-auto">
                <BiUser />
                <AiOutlinePlus />
                <BsThreeDots />
            </div>
        </div>
    )
}