import React from 'react'
import { getFromLocalStorage } from '../../utils/storage';

const Navbar = ({title}) => {
  const userName = getFromLocalStorage("authUserName");
  return (
    <div className="flex justify-between">
      <div className="pt-7 pl-4 text-3xl font-bold">{title}</div>
      <span>{userName}</span>

    </div>
    
  )
}

export default Navbar