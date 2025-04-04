import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import postsApi from "../../apis/posts";
import CommonForm from "../commons/Form";
import useFetchCategories from "../../hooks/useFetchCategories";
import Container from "../commons/Container";
import { getFromLocalStorage } from "../../utils/storage";

const Edit = () => {
  const history = useHistory();
  const { slug } = useParams();
  const categories = useFetchCategories();
  const [postId, setPostId] = useState("")

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [actionType, setActionType] = useState("Publish");
 const organizationId = getFromLocalStorage("authOrganizationId");
 const userId= getFromLocalStorage("authUserId")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const {data} = await postsApi.show(slug);
        const { id, title, description, categories } = data.post;
        setPostId(id);
        setTitle(title);
        setDescription(description);
        setSelectedCategories(categories.map(category=>category.id) || []);
      } catch (error) {
        logger.error(error);
      }
    };
    fetchPost();
  }, []);

  const handleUpdate = async () => {
    try {
      await postsApi.update(slug, {
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

  const handleDelete = async () => {
    try{
      await postsApi.destroy(slug);
      history.push("/");

    }catch(error){
      logger.error(error);
    }
  }

  const handlePreview = () => {
    history.push({
      pathname: `/blogs/${slug}/preview`,
      state: {
        title,
        description,
        categories: categories.filter(cat =>
          selectedCategories.includes(cat.id)
        ),
        status: actionType === "Publish" ? "Publish" : "Draft",
        user: { name: userId.name },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });
  };
  

  return (    
     <Container title="Edit blog post" className= "border border-gray-200 rounded-lg w- h-96 pl-10 mt-5" {...{actionType,setActionType,handleDelete,handlePreview}} handleSubmit={handleUpdate} showMenu >

    <div className="relative h-full">
      <CommonForm {... {
    title,
    setTitle,
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
    categories,
  }}/>
    </div>
    </Container>
  );
};

export default Edit;
