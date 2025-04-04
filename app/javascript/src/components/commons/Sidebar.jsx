import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storage';
import { resetAuthTokens } from '../../apis/axios';
import authApi from '../../apis/auth';
import profileImage from "images/profile.png";

const Sidebar = ({onToggleCategory}) => {
  const [showProfile, setShowProfile] = useState(false);
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail")

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
<div className="border border-l-2 border-gray-300 w-14 flex flex-col gap-2 p-2 fixed left-0 top-0 h-screen bg-white shadow-md">
<i className="ri-blogger-line text-3xl"></i>
        <Link to="/"> <i className="ri-menu-fill text-2xl mr-3"/></Link>
        <Link to="/blog-new">
        <i className="ri-edit-2-line text-2xl"></i>
      </Link>
      <i className="ri-list-check text-2xl cursor-pointer" onClick={onToggleCategory}></i>
      <Link to="/blogs"><i className="ri-folder-3-line text-2xl"/></Link>
      <div className="absolute bottom-3">
      <button onClick={() => setShowProfile(!showProfile)}><img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              /></button>
      {showProfile && (
          <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg p-3 w-48">
            <div className="flex items-center gap-2">
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>
            <hr className="my-2" />
            <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

</div>


    </div>
  )
}

export default Sidebar