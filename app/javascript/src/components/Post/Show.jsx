import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import PageLoader from '../commons/PageLoader';
import Logger from 'js-logger';
import postsApi from '../../apis/posts';
import Sidebar from '../commons/Sidebar';
import Navbar from '../commons/Navbar';
import { Typography } from '@bigbinary/neetoui';
import { formattedDate } from './utils';


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
        history.push("/");
      }finally{
        setLoading(false);
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


<div className="flex h-screen w-screen">
  <Sidebar/>
  <div className="flex flex-col p-10 w-full pb-20">
    <div className="flex gap-2">
      {post.categories.map(category => (
        <span key={category.id} className="p-1 px-3 bg-green-100 rounded-xl">
          {category.name}
        </span>
  ))}</div>
     <Navbar title={post.title} />
     <Typography className="ml-5 font-medium mt-3">{post.user.name}</Typography>
     <Typography className="ml-5 text-pretty text-sm">{formattedDate(post.created_at)}</Typography>
     <div className="px-5 mt-5">
        {post.description}
     </div>
   </div>
</div>

 

  
  )
}

export default Show