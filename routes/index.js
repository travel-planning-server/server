const router = require('express').Router()
const TravelPlanningController = require('../controllers/TravelPlanningController.js')

router.get('/travels', TravelPlanningController.getTravels)
router.post('/travels', TravelPlanningController.createTravel)
router.get('/province', TravelPlanningController.getProvince)
router.get('/covid/:province', TravelPlanningController.getCovid)

module.exports = router