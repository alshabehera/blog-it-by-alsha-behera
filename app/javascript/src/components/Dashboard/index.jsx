import React, { useState } from "react";
import Post from "../Post";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Category from "../Category";
import Sidebar from "../commons/Sidebar";
import Navbar from "../commons/Navbar";

const Dashboard = () => {
  const history = useHistory();
  const [showCategory, setShowCategory] = useState(false);
  const [clickedCategories, setClickedCategories] = useState([]); // Store selected categories

  const handleClick = () => {
    history.replace("/blog");
  };

  return (
    <div className="flex h-screen ml-16">
      <Sidebar onToggleCategory={() => setShowCategory(!showCategory)} />
      {showCategory && (
        <Category
          clickedCategories={clickedCategories}
          setClickedCategories={setClickedCategories}
        />
      )}
      <div className="flex flex-col w-full pb-20">
        <Navbar title="Blog Post" />
        <Post {...{clickedCategories}} />
      </div>
      <div className="h-10 mr-10 mt-6">
        <button className="bg-black text-white px-1 py-2" onClick={handleClick}>
          Add new blog post
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
