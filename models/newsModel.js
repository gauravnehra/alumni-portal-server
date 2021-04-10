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

    publishedBy: {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            refPath: 'publishedBy.userType',
        },
        userType: {
            type: String,
            required: true,
            enum: ['Admin', 'Faculty'],
        }
    },

    publishedOn: {
        type: Date,
        default: Date,
    },
})

module.exports = mongoose.model("News", newsSchema)