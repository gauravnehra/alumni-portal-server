const mongoose = require('mongoose')
var Schema = mongoose.Schema

let eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    venue: {
        type: String,
        required: true,
    },

    dataOfEvent: {
        type: Date,
        default: Date,
    },
})

module.exports = mongoose.model("Event", eventSchema)