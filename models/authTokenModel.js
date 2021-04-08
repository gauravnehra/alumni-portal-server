const mongoose = require('mongoose')
var Schema = mongoose.Schema

let authTokenSchema = new Schema({
    token: {},
    userId: {},
    status: {},
})

module.exports = mongoose.model("AuthToken", authTokenSchema)