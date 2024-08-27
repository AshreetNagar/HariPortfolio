const mongoose = require('mongoose');
const Tag = require('./Tag');
const Group = require('./Group');

const MediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    groups: {
        type: [String],
        required: false,
    },
    type: {
        type: String,
        enum: ['video', 'image', 'youtube_embed'],
        required: true,
    },
    thumbnailLink: {
        type: String,
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
    metadata:{
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Media', MediaSchema);
