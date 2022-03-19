const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: [true, 'Please enter the from user'],
        lowercase: true,
        trim: true
    },
    room: {
        type: String,
        required: [true, 'Please enter the room'],
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

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;