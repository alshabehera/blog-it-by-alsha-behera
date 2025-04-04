import React, { useEffect, useState } from "react";
import { Typography } from "@bigbinary/neetoui";
import postsApi from "../../apis/posts";
import Container from "../commons/Container";
import PageLoader from "../commons/PageLoader";
import { getFromLocalStorage } from "../../utils/storage";
import Table from "./Table";

const User = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
   const userId =getFromLocalStorage("authUserId")
   
    const fetchPosts = async () => {
        try {
          const {
            data: { posts },
          } = await postsApi.fetch();
          setPosts(posts);       
          
        } catch (error) {
          logger.error(error);        
        } finally{
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);

  const userPosts =posts.filter((post)=>
        post.user.id == userId)

  const handlePublish = async (slug,status) => {
    try {
      await postsApi.update(slug, {status: status});
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await postsApi.destroy(slug);
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    
  };


  if (loading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <Container title="My blog posts" className="pl-1">
      {userPosts?.length == 0 ? (
        <Typography className="flex justify-center items-center text-center mt-72 text-2xl">
          No posts available.
        </Typography>):(
        <div className="pt-5">
      <p className="text-gray-700 font-semibold pl-1">{userPosts.length} articles</p>
          <Table {...{userPosts,handlePublish,handleDelete}}/>
    </div>)}
    </Container>
    
  );
};

export default User;
