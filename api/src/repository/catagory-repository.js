const { Catagory } = require("../models/index");

class CatagoryRepository {
  async create(data) {
    try {
      const catagory = await Catagory.create(data);
      return catagory;
    } catch (error) {
      console.log("Error in Catagory Repository");
      throw error;
    }
  }

  async getAll() {
    try {
      const catagories = await Catagory.findAll();
      return catagories;
    } catch (error) {
      console.log("Error in Catagory Repository");
      throw error;
    }
  }
}

module.exports = CatagoryRepository;
