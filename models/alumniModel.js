const mongoose = require('mongoose')
var Schema = mongoose.Schema

let alumniSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },

    password: {
        type: String,
        required: true,
    },

    graduatedIn: {
        type: Number,
        min: 1980,
    },

    gender: {
        type: String,
        enum: ['M', 'F', 'Other']
    },

    mobile: {
        type: String, // with country code
    },

    currentJob: {
        profile: {
            type: String,
        },
        companyName: {
            type: String,
        }
    },

    authLevel: {
        type: Number,
        default: 4,
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