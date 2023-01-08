export const makeTimestampReadable = (dateInput) => {
  const dateObj = Date(dateInput);

  return dateObj.toLocaleString();
};

export const getCategoryNameById = (categories, categoryId) => {
  for (let categoryIdx in categories) {
    console.log(categoryId, categoryIdx);
    if (categoryId === categories[categoryIdx].id)
      return categories[categoryIdx].name;
  }
};
