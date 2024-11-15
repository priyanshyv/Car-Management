const express = require('express');

const router = express.Router();

const carController = require("../controllers/carController");

router.post('/cars',carController.createCar);
router.get('/cars',carController.getCars);
router.get('/cars/search',carController.searchCars);
router.get('/cars/:id',carController.getCarById);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
