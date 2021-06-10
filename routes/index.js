const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const TravelPlanningController = require('../controllers/TravelPlanningController.js')

router.post('/register', userController.postRegister)
router.post('/login', userController.postLogin)

router.get('/travels', TravelPlanningController.getTravels)
router.post('/travels', TravelPlanningController.createTravel)
router.get('/province', TravelPlanningController.getProvince)
router.get('/covid/:province', TravelPlanningController.getCovid)

module.exports = router;