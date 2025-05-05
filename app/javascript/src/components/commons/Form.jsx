import React from "react";
import Input from "./Input";
import Select from 'react-select'
import { categoryOptions } from "./constant";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  selectedCategories,
  setSelectedCategories,
  categories
}) => {

  const category = categoryOptions(categories);

    const handleCategoryChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedCategories(selectedValues);
  };

  const formattedSelectedCategories = category.filter(option =>
    selectedCategories.includes(option.value)
  );

  return (
    <div className="flex flex-col gap-2 mt-10">
      <Input
        label="Title*"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="Enter title"
        required
      />
      <Input
        label="Description*"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        placeholder="Enter description"
        required
      />
      
        <label htmlFor="category-select" className="font-medium">
          Categories*
        </label>
        <Select
          id="category-select"
          isMulti
          value={formattedSelectedCategories} 
          onChange={handleCategoryChange}
          options={category}
        />
      </div>

  );
};

export default Form;
