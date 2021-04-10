const mongoose = require('mongoose')
var Schema = mongoose.Schema

let eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
    },

    location: {
        type: String,
        required: true,
    },

    from: {
        type: Date,
        required: true,
    },

    to: {
        type: Date,
        required: true,
    },

    createdBy: {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            refPath: 'createdBy.userType',
        },
        userType: {
            type: String,
            required: true,
            enum: ['Admin', 'Faculty'],
        }
    },

    createdOn: {
        type: Date,
        default: Date,
    }
})

module.exports = mongoose.model("Event", eventSchema)