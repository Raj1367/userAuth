const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    },
}, { timestamps: true })

const userModel = mongoose.model("userdata", userSchema)
module.exports=userModel