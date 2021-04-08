const mongoose = require('mongoose')
var Schema = mongoose.Schema

let alumniSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {},
    password: {},
    batch: {},
    rollNumber: {},
    gender: {},
    dob: {},
    residenceCity: {
        type: String,
        required: false,
    },
    mobile: {},
    //social
    currentJob: {
        profile: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        }
    },
    // experiences
    authLevel: {
        type: Number,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    detailsVerified: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("Alumni", alumniSchema)