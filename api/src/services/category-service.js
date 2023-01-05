const { CatagoryRepository } = require("../repository/index");

const categoryRepository = new CatagoryRepository();

const create = async (data) => {
  try {
    const category = await categoryRepository.create(data);
    return category;
  } catch (error) {
    console.log("Error in category repository");
    throw error;
  }
};

const getAll = async () => {
  try {
    const categories = await categoryRepository.getAll();
    return categories;
  } catch (error) {
    console.log("Error in category repository");
    throw error;
  }
};

module.exports = {
  create,
  getAll,
};
