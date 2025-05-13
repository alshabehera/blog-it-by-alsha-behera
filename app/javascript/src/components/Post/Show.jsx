import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import PageLoader from '../commons/PageLoader';
import Logger from 'js-logger';
import postsApi from '../../apis/posts';
import Sidebar from '../commons/Sidebar';
import Navbar from '../commons/Navbar';
import { Button, Typography } from '@bigbinary/neetoui';
import { formattedDate } from './utils';
import Pdf from './Download';
import { Download } from '@bigbinary/neeto-icons';

const Show = () => {
    const [loading, setLoading] = useState(true);
   const [post,setPost] = useState();
   const [isModalOpen, setIsModalOpen] = useState(false);
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


<div className="flex h-screen">
  <Sidebar/>
  <div className="flex flex-col p-10 w-full pb-20 ml-16">
    <div className="flex gap-2">
      {post.categories.map(category => (
        <span key={category.id} className="p-1 px-3 bg-green-100 rounded-xl">
          {category.name}
        </span>
  ))}</div>
  <div className="flex justify-between">
    <div className="flex gap-2">
    <Navbar title={post.title} />
    {post.status == "Draft" && <span className="h-5 w-20 bg-red border border-red-600 rounded-md text-red-600 text-center mt-9">{post.status}</span>}
    </div>
    <div className="flex gap-5">
      <Button
                icon={Download}
                style="text"
                tooltipProps={{ content: "Download PDF", position: "top" }}
                onClick={() => setIsModalOpen(true)}
              />
  <a className="cursor-pointer" onClick={() =>  history.push(`/blog/${slug}/edit`)}>
    <i className="ri-edit-2-line text-2xl"/>
  </a>
  </div>
  </div>
     
     <Typography className="ml-5 font-medium mt-3">{post.user.name}</Typography>
     <Typography className="ml-5 text-pretty text-sm"> {formattedDate(post.updated_at || post.created_at)}</Typography>
     <div className="px-5 mt-5">
        <Typography>{post.description}</Typography>
     </div>
   </div>
   {isModalOpen && (
        <Pdf
          description={`Generating PDF for ${post?.title}`}
          setIsModalOpen={setIsModalOpen}
        />
      )}
</div>

 

  
  )
}

export default Show