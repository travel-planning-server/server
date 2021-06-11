const {jwtDecrypt} = require("../helpers/jwt")
const {User, TravelPlanning} = require("../models")

const authentication = (req, res, next) =>{
    try{
        const {access_token} = req.headers
        const dataDecoded = jwtDecrypt(access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user){
                    throw {name: "AuthenticationError", message:"User not Found"}
                } else {
                    req.currentUser = {id: user.id}
                    next()
                }
            }) .catch(err => {
                next(err)
            })
    } catch(err) {
        next(err)
    } 
}

const travelAuth = (req, res, next) =>{
    const id = req.params.id

    TravelPlanning.findOne({where:{id:id}})
        .then(travel =>{
            if (!travel) {
                throw {
                    name: "TravelNotFound",
                    message: `travel with id ${id} not found`,
                }
            }
            if (travel.userId == req.currentUser.id) {
                req.target = travel
                next()
            }
            else throw {name:"AuthorizationError"}
        }) .catch(err =>{
            next(err)
        })
}

module.exports = {authentication, travelAuth}