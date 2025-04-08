export const categoryOptions = (categories) =>
    categories.map((category) => ({
        value: category.id,
        label: category.name
    }));
