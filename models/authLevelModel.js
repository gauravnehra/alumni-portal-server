const mongoose = require('mongoose')
var Schema = mongoose.Schema

let authLevelSchema = new Schema({
    level: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("AuthLevel", authLevelSchema)