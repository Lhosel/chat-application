const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        },
        required: [true, 'Please enter username'],
        lowercase: true,
        trim: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter first name'],
        lowercase: true,
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter last name'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    createdon: {
        type: Date,
        required: [true, 'Please enter creation date']
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;