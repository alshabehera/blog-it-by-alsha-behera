import React, { useEffect, useState } from "react";
import PageLoader from "../commons/PageLoader";
import Card from "./Card";
import { isNil, isEmpty, either } from "ramda";
import postsApi from "../../apis/posts";
import Logger from "js-logger";

const Post = ({ clickedCategories }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      console.log(posts)
      
    } catch (error) {
      Logger.error(error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts =
    clickedCategories.length === 0
      ? posts 
      : posts.filter((post) =>
          post.categories.some((category) => clickedCategories.includes(category.id))
        );

  if (loading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }
  if (either(isNil, isEmpty)(filteredPosts)) {
    return (
      <h1 className="flex justify-center items-center text-center text-xl leading-5 ml-4 h-screen">
        No posts available for the selected category.
      </h1>
    );
  }

  return (
    <div className="flex flex-col pl-7 min-w-3.5 mt-7 gap-4">
      {filteredPosts.map((post) => (
        <Card key={post.id} {...post}/>
      ))}
    </div>
  );
};

export default Post;
