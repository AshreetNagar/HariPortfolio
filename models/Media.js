const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    group: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['video', 'image', 'youtube_embed'],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Media', MediaSchema);
