const bcrypt = require('bcryptjs')

const bcryptHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(3))
const bcryptComp = (password, dbPass) => bcrypt.compareSync(password, dbPass)

module.exports = {bcryptHash, bcryptComp}