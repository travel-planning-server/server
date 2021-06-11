const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const TravelPlanningController = require('../controllers/TravelPlanningController.js');
const { authentication } = require('../middlewares/auth');

router.post('/register', userController.postRegister)
router.post('/login', userController.postLogin)

router.get('/travels', authentication, TravelPlanningController.getTravels)
router.get('/travels/:id', authentication, TravelPlanningController.getTravelById)
router.post('/travels', authentication, TravelPlanningController.createTravel)
router.put('/travels/:id', authentication, TravelPlanningController.putTravel)
router.delete('/travels/:id', authentication, TravelPlanningController.deleteTravel)
router.get('/province', TravelPlanningController.getProvince)
router.get('/covid/:province', TravelPlanningController.getCovid)

module.exports = router;