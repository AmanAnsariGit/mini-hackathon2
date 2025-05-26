import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className="container">
        <div className="nav_wrapper">
          <div className="webLogo">
            <span>Event Managment</span>
          </div>
          <ul className="menu_list">
            <Link to={'/home'}>Events</Link>
            <Link>Brands</Link>
          </ul>

          <div className="search-bar">
            <span>
              <IoSearch size={22} color='grey'/>
            </span>
            <input type="text" placeholder="Search for products...." />
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <span>
              <IoCartOutline size={22} />
            </span>
            <span>
              <FaRegCircleUser size={19}/>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
