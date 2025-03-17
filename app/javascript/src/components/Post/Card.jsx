import React from 'react'

const Card = ({title,description,created_at}) => { 
    const date = new Date("2025-03-17T06:41:40.864Z");

    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options); 
    return (
      <>
        <div className="border-b-2 border-gray-300">
            <div className="text-lg font-bold pb-3">
            {title}
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