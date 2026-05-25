import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoNotificationsOutline, IoNotifications, IoSearch, IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { PiChatsCircle, PiChatsCircleFill } from "react-icons/pi";
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";

function Navbar() {
  return (
    <div className='navbar-main'>
      <h1 className='navbar-title'>Chat App</h1>
      <div className='navbar-links-box'>
        <div className='navbar-links'>
          <NavLink to='/home'>
            {({ isActive }) =>
              isActive ? (
                <TbMessageCircleFilled size={23} className='nav-icons active' />
              ) : (
                <TbMessageCircle size={23} className='nav-icons' />
              )
            }
          </NavLink>
          <NavLink to='/notifications'>
            {({ isActive }) =>
              isActive ? (
                <IoNotifications size={23} className='nav-icons active' />
              ) : (
                <IoNotificationsOutline size={23} className='nav-icons' />
              )
            }
          </NavLink>
          <NavLink to='/search'>
            {({ isActive }) =>
              isActive ? (
                <IoSearch size={23} className='nav-icons active' />
              ) : (
                <IoSearchOutline size={23} className='nav-icons' />
              )
            }
          </NavLink>
          <NavLink to='/profile'>
            {({ isActive }) =>
              isActive ? (
                <FaUserCircle size={23} className='nav-icons active' />
              ) : (
                <FiUser size={23} className='nav-icons' />
              )
            }
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
