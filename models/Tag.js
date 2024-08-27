const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Tag', TagSchema);
