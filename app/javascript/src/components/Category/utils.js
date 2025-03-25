export const filterCategories = (categories,searchKey) => categories.filter((category) =>
    category.name.toLowerCase().includes(searchKey.toLowerCase()))