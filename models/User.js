const mongoose = require("mongoose")
const RoleModel = require("./Role")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: Boolean,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    }         
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;