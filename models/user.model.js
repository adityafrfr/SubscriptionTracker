import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'username is required'], trim: true, minLength: 2, maxLength: 50},
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/, 'Enter a valid email']
    },
    password: {type: String, required: [true, 'password is required'], minlength: 8,}
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User