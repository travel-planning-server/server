const jwt = require('jsonwebtoken')

const SECRETKEY = process.env.JWT_KEY

const jwtEncrypt = (payload) => jwt.sign(payload, SECRETKEY)
const jwtDecrypt = (token) => jwt.verify(token, SECRETKEY)

module.exports = {jwtEncrypt, jwtDecrypt}