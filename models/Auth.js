const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    userID : {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    hashedpw: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Auth', AuthSchema);
