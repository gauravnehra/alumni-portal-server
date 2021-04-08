const mongoose = require('mongoose')
var Schema = mongoose.Schema

let authTokenSchema = new Schema({
    token: {
        type: String,
        unique: true,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        unique: true,
        required: true,
    },
    userType: {
        type: String,
        enum: ['alumni', 'faculty', 'admin'],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active',
    },
})

module.exports = mongoose.model("AuthToken", authTokenSchema)