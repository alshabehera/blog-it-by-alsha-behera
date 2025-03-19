import React from 'react'
import { useHistory } from 'react-router-dom';

const Card = ({title,description,created_at,slug}) => { 
    const history = useHistory();
    const date = new Date(created_at);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options); 
    const showPost = slug => {
      history.push(`/blog/${slug}`);
    };
    return (
      <>
        <div className="border-b-2 border-gray-300">
            <div className="text-lg font-bold pb-3">
            <a className="cursor-pointer" onClick={() => showPost(slug)}>
           {title}
          </a>
            </div>
            <div>
                {description}
            </div>
            <span>{ formattedDate}</span>
            
            </div>
      </>
    );
  }

export default Card