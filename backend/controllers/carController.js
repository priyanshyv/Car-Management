const Car = require("../models/Cars");

exports.createCar = async (req, res) => {
  try {
    const { title, description, images, tags } = req.body;
    // images.slice(0, 10)->yei bhi kar sakte hai ismey
    const newCar = new Car({ title, description, images, tags });
            await newCar.save();
    return res.status(200).json({ success: true, message: `New Car Created Successfully ${newCar}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error Creating New Car", error: error.message });
  }
};

// Get all cars
exports.getCars = async (req, res) => {
  try {
        const cars = await Car.find();
        res.json(cars);
  } catch (error) {
    res.status(400).json({ error: "Error fetching cars" });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "car not found" });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: "Error fetching car details" });
  }
};

// Search cars by keyword
exports.searchCars = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },  // Title me search
        { description: { $regex: keyword, $options: 'i' } },  // Description me search
        { tags: { $elemMatch: { $regex: keyword, $options: 'i' } } } // Tags me search
      ]
    };
    const cars = await Car.find(query);
    console.log("Search query:", req.query);
    console.log("Matched cars:", cars);
    res.json(cars);
  } catch (error) {
    console.error("Error in searchCars:", error);
    res.status(500).json({ error: "Error searching cars" });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  try {

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ error: "Error updating car" });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {




  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting car" });
  }
};

  

  