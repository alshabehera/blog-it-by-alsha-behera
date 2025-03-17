import React, { useEffect, useState } from 'react'
import PageLoader from '../commons/PageLoader';
import Card from './Card';
import { isNil, isEmpty, either } from "ramda";
import postsApi from '../../apis/posts';
import Logger from 'js-logger';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchPosts = async () => {
      try {
        const {
          data: { posts },
        } = await postsApi.fetch();
        console.log(posts)
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        Logger.error(error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchPosts();
      }, []);
    
      if (loading) {
        return (
          <div>
            <PageLoader />
          </div>
        );
      }
      if (either(isNil, isEmpty)(posts)) {
        return (
            <h1 className="w-screen text-center text-xl leading-5">
              You have not created any posts.
            </h1>
        );
      }

      return (
        <>
        <div className="pl-7">
          {
            posts.map(post => (
              <Card key={post.id} {...post} />
            ))
          }
          </div>
        </>
      );
      
}

export default Post