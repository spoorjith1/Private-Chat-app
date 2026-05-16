import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoChatbubbleEllipses, IoPeople, IoSearch, IoNotifications, IoPerson } from 'react-icons/io5'

function Navbar() {
  return (
    <>
    <div className='main-navbar'>
      <h1 className='nav-app-title'>Chat App</h1>
      <div className='nav-link-container'>
        <NavLink to="/home" className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}>
          <IoChatbubbleEllipses size={24} />
        </NavLink>
        <NavLink to="/friends" className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}>
          <IoPeople size={24} />
        </NavLink>
        <NavLink to="/search" className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}>
          <IoSearch size={24} />
        </NavLink>
        <NavLink to="/requests" className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}>
          <IoNotifications size={24} />
        </NavLink>
        <NavLink to="/profile" className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}>
          <IoPerson size={24} />
        </NavLink>
      </div>
    </div> 
    </>
  )
}

export default Navbar