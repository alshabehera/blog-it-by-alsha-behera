import React from 'react'
import Post from '../Post'
import Container from '../commons/Container'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const Dashboard = () => {
  const history = useHistory();
  const handleClick = () =>{
 history.replace('/blog')
  }

  return (
    <div className="flex">
    <Container title={"Blog Posts"}>
      <Post/>
    </Container>
    <div className="h-10 pb-5 m-4">
    <button className="bg-black text-white" onClick={handleClick}>Add new blog post</button>


    </div>
    </div>
   
  )
}

export default Dashboard