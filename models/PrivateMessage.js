const mongoose = require('mongoose');

const PrivateMesssageSchena = new mongoose.Schema({
    from_user: {
        type: String,
        required: [true, 'Please enter the from user'],
        lowercase: true,
        trim: true
    },
    to_user: {
        type: String,
        required: [true, 'Please enter the to_user'],
        lowercase: true,
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please enter the message']
    },
    date_sent: {
        type: Date,
        required: [true, 'Please enter the date sent']
    }
});

const PrivateMesssage = mongoose.model("PrivateMessage", PrivateMesssageSchena);
module.exports = PrivateMesssage;