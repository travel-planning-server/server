const { TravelPlanning } = require('../models')
const axios = require('axios').default
const checkHoliday = require('../helpers/check_holiday.js')

class Controller {
    static async getTravels(req, res, next) {
        console.log(req.currentUser)
        try {      
            const userId = req.currentUser.id      
            const travels = await TravelPlanning.findAll({
                where: { userId }
            })
            return res.status(200).json(travels)
        } catch (err) {
            console.log("error getTravels", err);
            return res.status(500).json({ message: "error", error: err.name})
            // next(err)
        }
    }

    static async getTravelById(req, res, next) {
        try {
            let newHoliday = null
            const travel = await TravelPlanning.findByPk(req.params.id)            
            if (travel) {
                const getHolidaysFromApi = await checkHoliday('id', travel.travelDate)
                console.log("getHolidaysFromApi", getHolidaysFromApi);
    
                if (getHolidaysFromApi.length) {
                    getHolidaysFromApi.map(el => {
                        newHoliday = {
                            holiday_name: el.name,
                            holiday_date: travel.travelDate,
                            holiday_description: el.description,
                            holiday_type: el.type[0]
                        }
                    })
                }
                travel.dataValues.travelDate = {
                    value: travel.travelDate,
                    holiday: newHoliday
                }
                return res.status(200).json(travel)
            } 

            return res.status(404).json({message: `Travel with id ${req.params.id} not found`})
        } catch (err) {
            console.log("error getTravelById", err);
            return res.status(500).json({ message: "error", error: err.name})
            // next(err)
        }
    }

    static async createTravel(req, res, next) {
        try {       
            const { travelDestinationProvince, travelDestinationCity, travelDate } = req.body
            const userId = req.currentUser.id
            const newTravelPlan = await TravelPlanning.create({
                travelDestinationProvince, travelDestinationCity, travelDate, userId
            })

            return res.status(201).json({
                message: "success",
                data: newTravelPlan
            })
        } catch (err) {
            console.log(err);
            // next(err)
            return res.status(500).json({
                message: "error",
                error: error.name
            })
        }
    }

    static async putTravel(req, res, next) {
        try {
            const { travelDestinationProvince, travelDestinationCity, travelDate } =  req.body            
            const updatedTravel = await TravelPlanning.update({
                travelDestinationProvince, travelDestinationCity, travelDate
            }, { 
                where: { id: req.params.id }, returning: true
            })

            if (updatedTravel) {
                return res.status(200).json({
                    message: "success",
                    data: updatedTravel[1][0]
                })
            }
            
        } catch (err) {
            console.log("Error putTravel", err);
            res.status(500).json({ message: "error", error: err.name})
        }
    }

    static async deleteTravel(req, res, next) {
        try {
            const { id } = req.params
            const deletedTravel = await TravelPlanning.destroy({
                where: { id }
            })            

            if (!deletedTravel) return res.status(404).json({ message: `Travel with id ${id} not found`})

            return res.status(200).json({ message: "Success delete" })
        } catch (err) {
            console.log("error deleteTravel", err);
            return res.status(500).json({
                message: "error",
                error: err.name
            })
        }
    }

    static async getProvince(req, res, next) {
        const provinceApi = 'https://dev.farizdotid.com/api/daerahindonesia/provinsi'
        try {
            const province = await axios.get(provinceApi)

            return res.status(200).send(province.data)
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "error",
                error: err.name
            })
        }
    }

    static async getCovid(req, res, next) {
        const covidApi = 'https://data.covid19.go.id/public/api/prov.json'
        try {
            const covidData = await axios.get(covidApi)     
            const province = req.params.province.toUpperCase()
            const { last_date, list_data } = covidData.data
            const dataByProvince = list_data.filter(el => {
                return el.key == province
            })
            const { key, jumlah_kasus, jumlah_sembuh, jumlah_meninggal, jumlah_dirawat } = dataByProvince[0]            
            const response = {
                last_date,
                list_data: {
                    key, jumlah_kasus, jumlah_sembuh, jumlah_meninggal, jumlah_dirawat
                }
            }

            return res.status(200).send(response)
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "error",
                error: err.name
            })
            // next(err)
        }
    }
}

module.exports = Controller