const mongoose = require('mongoose')
var Schema = mongoose.Schema

let facultySchema = new Schema({
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

    department: {
        type: String,
    },

    gender: {
        type: String,
        enum: ['M', 'F', 'Other']
    },

    mobile: {
        type: String, // with country code
    },

    authLevel: {
        type: Number,
        default: 5,
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

module.exports = mongoose.model("Faculty", facultySchema)