const {User} = require('../models/index.js')
const {bcryptComp} = require('../helpers/bcrypt')
const {jwtEncrypt} = require('../helpers/jwt')

class Controller{
    static postRegister(req, res, next){
        if (!req.body.email || !req.body.password) throw {name: "FillEmailPassword"}
        User.create(req.body)
            .then(() => {
                res.status(200).json({message: "User Registered", email:req.body.email})
            })
            .catch((err) => {
                next(err)
            })
    }

    static postLogin(req, res, next){
        console.log(req.body.email)
        console.log(req.body.password)
        if (!req.body.email || !req.body.password) throw {name: "FillEmailPassword"}
        console.log('here')
        User.findOne({where:{email: req.body.email.toLowerCase()}})
            .then(user => {
                console.log(user)
                if (!user) throw {name: "noEmail"}
                if(bcryptComp(req.body.password, user.password)){
                    const token = jwtEncrypt({id: user.id, email: user.email})
                    res.status(200).json({message: "login successful", access_token: token})
                }
                else throw {name: "wrongPassword"}
            })
            .catch((err) =>{
                next(err)
            })
    }
}

module.exports = Controller