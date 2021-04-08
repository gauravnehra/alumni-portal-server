const mongoose = require('mongoose')
var Schema = mongoose.Schema

let adminSchema = new Schema({
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

    authLevel: {
        type: Number,
        default: 6,
    },

    emailVerified: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("Admin", adminSchema)