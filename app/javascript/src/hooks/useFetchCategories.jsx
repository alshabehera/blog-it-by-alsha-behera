import { useEffect, useState } from "react";
import categoriesApi from "../apis/categories";
import Logger from "js-logger";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.fetch();
      if (response.data?.categories) {
        const formattedCategories = response.data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(formattedCategories);
      } else {
        console.error("Invalid API response structure", response);
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories; // Returning array of objects with id and name
};

export default useFetchCategories;
