import React from 'react'
import Sidebar from '../commons/Sidebar'
import Navbar from '../commons/Navbar'
import Post from '../Post'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
    <Sidebar/>
    <div className="flex flex-col pl-10">
    <Navbar/>
    <Post/>
    </div>
    </div>
   
  )
}

export default Dashboard