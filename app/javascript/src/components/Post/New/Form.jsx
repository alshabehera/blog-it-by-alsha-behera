import React, { useState } from 'react';
import Input from '../../commons/Input';
import postsApi from '../../../apis/posts';
import { useHistory } from 'react-router-dom';
import { getFromLocalStorage } from '../../../utils/storage';

const Form = ({ title, description, setTitle, setDescription, categories }) => {
  const history = useHistory();
  const [selectedCategories, setSelectedCategories] = useState([]);
   const organizationId = getFromLocalStorage("authOrganizationId");
    const userId = getFromLocalStorage("authUserId");

  const handleSubmit = async () => {
    try {
      await postsApi.submit({
        title,
        description,
        category_ids: selectedCategories.map(id => Number(id)), // Ensure IDs are numbers
        user_id: userId,
        organization_id: organizationId,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedValues);
  };

  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-2 mt-4">
        <Input
          label="Title*"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter title"
          required
        />
        <div>
          <Input
            label="Description*"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            placeholder="Enter description"
            required
          />
          <div className="flex flex-col mt-1 -mb-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="category-select" className="font-medium">Categories*</label>
              <select
                id="category-select"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p>
                Selected: {selectedCategories.map(id => categories.find(cat => cat.id == id)?.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 absolute mb-10 bottom-0 right-0">
        <button className="bg-black border border-black rounded-md px-5 py-3 text-white" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button className="border-black rounded-md px-5" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
