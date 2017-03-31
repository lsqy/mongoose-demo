'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, data: Date }],
    data: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

const Blog = mongoose.model('Blog', blogSchema);