import React from "react";
import CommonForm from "../../commons/Form";

const Form = ({ setTitle,title,setDescription,description,categories,selectedCategories,setSelectedCategories }) => {
  return (
    <div className="relative h-full">
       <CommonForm {... {
    title,
    setTitle,
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
    categories
  }}/>     
    </div>
  );
};

export default Form;


