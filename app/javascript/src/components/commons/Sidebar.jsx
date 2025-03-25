import React from 'react'
import { Link } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";

const Sidebar = ({onToggleCategory}) => {
  return (
    <div className="border border-l-2 border-gray-300 w-14 h-full flex flex-col gap-2 p-2">
       <i className="ri-blogger-line text-3xl"></i>
        <Link to="/"> <i className="ri-menu-fill text-2xl mr-3"/></Link>
        <Link to="/blog">
        <i className="ri-edit-2-line text-2xl"></i>
      </Link>
      <i className="ri-list-check text-2xl cursor-pointer" onClick={onToggleCategory}></i>

    </div>
  )
}

export default Sidebar