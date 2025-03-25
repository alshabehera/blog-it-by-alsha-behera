import React, { useEffect, useState } from 'react'
import Form from './Form';
import Container from '../../commons/Container';
import useFetchCategories from '../../../hooks/useFetchCategories';


const New = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] =useState("");
  const categories = useFetchCategories();
  return (
    <Container title="New blog post" className= "border border-gray-200 rounded-lg w-full h-screen pl-10 mt-5">
      <Form {...{title,description,setTitle,setDescription,categories}}/>
    </Container>
  )
}

export default New;