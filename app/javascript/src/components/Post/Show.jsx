import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import PageLoader from '../commons/PageLoader';
import Logger from 'js-logger';
import postsApi from '../../apis/posts';
import Container from '../commons/Container';

const Show = () => {
    const [loading, setLoading] = useState(true);
   const [post,setPost] = useState();
   const { slug } = useParams();
   const history = useHistory();
    const fetchPost = async () => {
      try {
        const {
          data: { post },
        } = await postsApi.show(slug);

        setPost(post);
        setLoading(false);
      } catch (error) {
        Logger.error(error);
        setLoading(false);
        history.push("/");
      }
    };
    useEffect(() => {
        fetchPost();
      }, []);
    
      if (loading) {
        return (
          <div>
            <PageLoader />
          </div>
        );
      }
  return (
   <Container title={post.title}>
     {post.description}
   </Container>
  )
}

export default Show