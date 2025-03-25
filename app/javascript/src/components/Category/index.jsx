import React, { useState } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";
import DetailModal from "./DetailModal";
import SearchBar from "./SearchBar";
import { filterCategories } from "./utils";

const Category = ({ setClickedCategories, clickedCategories }) => {
  const [isModalOpen,setIsModalOpen] =  useState(false);
  const [searchKey,setSearchKey] = useState("");
  const [isSearchBarVisible , setIsSearchBarVisible]= useState(false);
  const categories = useFetchCategories();
  

  const handleClick = (categoryId) => {
    setClickedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };
 
  const filteredCategories = filterCategories(categories,searchKey);

  const handleAddClick=()=>{
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="relative w-96 h-full bg-gray-100 p-4 flex flex-col">
      <div className="flex">
      <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
      <i className="ri-add-line self-end mb-5 mx-4 cursor-pointer" onClick={handleAddClick}/>
      
      <i className="ri-search-line self-end mb-5 cursor-pointer" onClick={()=>{setIsSearchBarVisible(true)}}/>
      {isSearchBarVisible && (
        <div className="relative">
          <SearchBar {...{ searchKey, setSearchKey }} />
        </div>
      )}
      </div>
      
      <div className="flex flex-col gap-2">
        {filteredCategories.length > 0 &&
          filteredCategories.map((category) => {
            const isSelected = clickedCategories.includes(category.id);

            return (
              <button
                key={category.id}
                className={`w-full px-3 py-2 text-left border rounded transition-all duration-200 ${
                  isSelected
                    ? "bg-gray-300 border-gray-600"
                    : "bg-white hover:bg-gray-200 border-gray-300"
                }`}
                onClick={() => handleClick(category.id)}
              >
                {category.name}
              </button>
            );
          })}
      </div>
      {isModalOpen && <DetailModal {...{isModalOpen, setIsModalOpen} } />}
    </div>
    
  );
};

export default Category;
