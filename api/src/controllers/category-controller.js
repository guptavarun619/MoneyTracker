const { CategoryService } = require("../services");

const create = async (req, res) => {
  try {
    const response = await CategoryService.create({
      name: req.body.name,
    });
    res.status(201).json({
      success: true,
      data: response,
      message: "Category has been created successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Category cannot be created",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await CategoryService.getAll();
    res.status(200).json({
      success: true,
      data: response,
      message: "Categories have been fetched successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Categories cannot be fetched",
      err: error,
    });
  }
};

module.exports = {
  create,
  getAll,
};
