import React, { useState } from "react";
import { Typography, Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";
import { formattedDate } from "./utils";
import postsApi from "../../apis/posts";
import { DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import classNames from "classnames";

const Card = ({
  title,
  created_at,
  updated_at,
  slug,
  categories,
  user,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  is_bloggable,
}) => {
  const history = useHistory();
 
  const [voteState, setVoteState] = useState({
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    is_bloggable: is_bloggable,
  });

  const [userVote, setUserVote] = useState(null);

  const showPost = () => {
    history.push(`/blog/${slug}`);
  };

  const handleVote = async (voteType) => {
    try {
      const { data } = await postsApi.vote(slug, voteType);

      setVoteState({
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        is_bloggable: data.is_bloggable,
      });

      
      if (userVote === voteType) {
        setUserVote(null); 
      } else {
        setUserVote(voteType);
      }
    } catch (error) {
      console.error("Voting failed:", error);
    }
  };

  const netVotes = voteState.upvotes - voteState.downvotes;

  return (
    <div className="flex justify-between border-b-2 border-gray-300">
    
    <div className="flex flex-col p-4 space-y-2">
      <div className=" flex gap-5">
        <a className="cursor-pointer" onClick={showPost}>
          <Typography className="text-lg font-bold">{title}</Typography>
        </a>
        {voteState.is_bloggable && (
          <span className="p-1 px-3 bg-green-100 rounded-xl font-medium text-xs">Blog it</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <span
            key={category.id}
            className="p-1 px-3 bg-green-100 rounded-xl font-medium text-xs"
          >
            {category.name}
          </span>
        ))}
      </div>

      <Typography className="text-sm">{user?.name}</Typography>
      <span className="text-gray-500 text-xs">
        {formattedDate(updated_at || created_at)}
      </span>
</div>
      <div className="flex flex-col items-center gap-3 pt-2">
        <Button
  icon={UpArrow}
  size="small"
  style="link"
  onClick={() => handleVote(1)}
  className={classNames("text-gray-600", { "text-green-600": userVote === 1 })}
/>

<span
  className={classNames("font-semibold text-sm", {
    "text-green-700": netVotes > 0,
    "text-red-600": netVotes < 0,
    "text-gray-600": netVotes === 0,
  })}
>
  {netVotes}
</span>

<Button
  icon={DownArrow}
  size="small"
  style="link"
  onClick={() => handleVote(-1)}
  className={classNames("text-gray-600", { "text-red-600": userVote === -1 })}
/>
</div>
        
      
    </div>
  );
};

export default Card;
