import React from 'react'

const Navbar = ({title}) => {
  return (
    <div className="flex justify-between">
      <div className="pt-7 pl-4 text-3xl font-bold">{title}</div>
    </div>
    
  )
}

export default Navbar