import React, { useState } from 'react'
import Form from './Form';
import Container from '../../commons/Container';


const New = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] =useState("");
  return (
    <Container title="New blog post" className= "border border-gray-200 rounded-lg w-full h-full pl-10">
      <Form {...{title,description,setTitle,setDescription}}/>
    </Container>
  )
}

export default New;