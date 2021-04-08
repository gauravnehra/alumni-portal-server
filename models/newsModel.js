const mongoose = require('mongoose')
var Schema = mongoose.Schema

let newsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    // name
    publishedBy: {
        type: String,
        required: true,
    },

    publishedOn: {
        type: Date,
        default: Date,
    },
})

module.exports = mongoose.model("News", newsSchema)