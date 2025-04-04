import React, { useEffect, useState } from 'react'
import Form from './Form';
import Container from '../../commons/Container';
import useFetchCategories from '../../../hooks/useFetchCategories';
import postsApi from '../../../apis/posts';
import { useHistory } from 'react-router-dom';
import { getFromLocalStorage } from '../../../utils/storage';


const New = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] =useState("");
  const [actionType, setActionType] = useState("Publish");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const history = useHistory();
  
  const categories = useFetchCategories();
  const organizationId = getFromLocalStorage("authOrganizationId");
  const userId = getFromLocalStorage("authUserId");


  const handleSubmit = async () => {
    try {
      await postsApi.create({
        title,
        description,
        category_ids: selectedCategories.map(id => Number(id)),
        user_id: userId,
        organization_id: organizationId,
        status: actionType === "Publish" ? "Publish" : "Draft"
      });
      history.push("/");
    } catch (error) {
      logger.error(error);    }
  };

  return (
    <Container title="New blog post" className= "border border-gray-200 rounded-lg w-full h-96 pl-10 mt-5" {...{actionType,setActionType,handleSubmit}}>
      <Form {...{title,setDescription,description,setTitle,categories,selectedCategories,setSelectedCategories}}/>
    </Container>
  )
}

export default New;