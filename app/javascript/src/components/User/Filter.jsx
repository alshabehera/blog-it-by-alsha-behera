import React, { useState } from "react";
import Select from 'react-select'

import { Button, Input, Pane,Typography } from "@bigbinary/neetoui";
import useFetchCategories from "../../hooks/useFetchCategories";
import { categoryOptions } from "../commons/constant";
import { useHistory, useLocation } from "react-router-dom";

const Filters = ({isPaneOpen, setIsPaneOpen}) => {
  const [filterTitle, setFilterTitle] = useState("");
  const [blogStatus, setBlogStatus] = useState(null);
  const statusOptions = [{value:"publish", label:"Publish"}, {value:"draft", label:"Draft"}]
  const categories = useFetchCategories();
  const category = categoryOptions(categories);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();

  const handleCategoryChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedCategories(selectedValues);
  };

  const formattedSelectedCategories = category.filter(option =>
    selectedCategories.includes(option.value)
  );

  const handleClearFilters = () => {
    setFilterTitle("");
    setBlogStatus(null);
    setSelectedCategories([]);
    history.push("/blogs");
  };

  
const handleSubmit = async () => {
  const params = new URLSearchParams();

  if (filterTitle) params.set("title", filterTitle);
  if (blogStatus) params.set("status", blogStatus);
  selectedCategories.forEach(id => params.append("category_ids", id));

  history.push({ pathname: "/blogs", search: params.toString() });
  setIsPaneOpen(false);}

  return (
    <Pane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)}>
      <div className="flex h-full flex-col justify-between px-10 py-8 lg:px-4">
         <div className="mt-8 flex flex-col gap-4">
      <Typography
        style="h2"
        weight="semibold"
      >Filter
      </Typography>
      <Input
  label="Title"
  value={filterTitle}
  onChange={e => setFilterTitle(e.target.value)}
/>
           <label htmlFor="category-select" className="font-medium">
          Categories
        </label>
        <Select
          isMulti
          id= "category-select"
          value={formattedSelectedCategories} 
          onChange={handleCategoryChange}
          options={category}
        />

<label htmlFor="status-select" className="font-medium">
          Status
        </label>
        <Select
  id="status-select"
  value={statusOptions.find(option => option.value === blogStatus)}
  onChange={selectedOption => setBlogStatus(selectedOption.value)}
  options={statusOptions}
/>
        </div> 
        <div className="flex gap-4">
          <Button label="Done" onClick={handleSubmit} />
          <Button
           label="Clear filters"
            className="border-2 border-solid bg-white"
            style="secondary"
            onClick={handleClearFilters}
          />
        </div>
      </div>
    </Pane>
  )};
export default Filters;