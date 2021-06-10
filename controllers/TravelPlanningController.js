const { TravelPlanning } = require('../models')
const axios = require('axios').default

class Controller {
    static async getTravels(req, res, next) {
        try {      
            req.currentUser = { id: 1 }
            const userId = req.currentUser.id      
            const travels = await TravelPlanning.findAll({
                where: { userId }
            })

            return res.status(200).json(travels)
        } catch (err) {
            next(err)
        }
    }

    static async createTravel(req, res, next) {
        try {
            req.currentUser = { id: 1 }
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
            const { last_date, list_data } = covidData.data
            const dataByProvince = list_data.filter(el => {
                return el.key == req.params.province
            })
            const {jumlah_kasus, jumlah_sembuh, jumlah_meninggal, jumlah_dirawat} = dataByProvince[0]
            
            const response = {
                last_date, 
                list_data: {
                    jumlah_kasus, jumlah_sembuh, jumlah_meninggal, jumlah_dirawat
                }
            }
            return res.status(200).send(response)
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "error",
                error: err.name
            })
        }
    }
}

module.exports = Controller