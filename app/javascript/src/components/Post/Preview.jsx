import React from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom';
import PageLoader from '../commons/PageLoader';
import Sidebar from '../commons/Sidebar';
import Navbar from '../commons/Navbar';
import { Typography } from '@bigbinary/neetoui';
import { formattedDate } from './utils';


const Preview = () => {
    const history = useHistory();
    const location = useLocation();
    const { slug } = useParams();
    const post = location.state;

    if (!post) {
        return <PageLoader />;
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
  <a className="cursor-pointer" onClick={() =>  history.push(`/blog/${slug}/edit`)}>
    <i className="ri-edit-2-line text-2xl"/>
  </a>
  </div>
     
     <Typography className="ml-5 font-medium mt-3">{post.user.name}</Typography>
     <Typography className="ml-5 text-pretty text-sm"> {formattedDate(post.updated_at || post.created_at)}</Typography>
     <div className="px-5 mt-5">
        <Typography>{post.description}</Typography>
     </div>
   </div>
</div>

 

  
  )
}

export default Preview