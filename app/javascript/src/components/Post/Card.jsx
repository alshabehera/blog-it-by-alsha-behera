import { Typography } from '@bigbinary/neetoui';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { formattedDate } from './utils';

const Card = ({title,created_at,slug,categories,user}) => { 
    const history = useHistory(); 
    const showPost = slug => {
      history.push(`/blog/${slug}`);
    };

    return (
      <>
        <div className="flex flex-col border-b-2 border-gray-300 gap-1">
            <div className="font-bold pb-2 mr-5">
             <a className="cursor-pointer" onClick={() => showPost(slug)}>
              <Typography className="text-lg">{title}</Typography>
             </a>
            </div>
            <div className="flex gap-2">
              {categories?.map(category => (
                <span key={category.id} className="p-1 px-3 bg-green-100 rounded-xl font-medium text-xs">
                  {category.name}
                </span>
         ))}</div>
            <Typography className="text-sm font-medium">{user && user.name}</Typography>
            <span className="text-gray-500 text-xs">{ formattedDate(created_at)}</span>
            
            </div>
      </>
    );
  }

export default Card