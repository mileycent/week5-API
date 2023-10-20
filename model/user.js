const mongoose = require('mongoose');
const Schema = mongoose.Schema

const novel = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
},{timestamps: true});

const Model = mongoose.model('fifth', novel);
module.exports = Model;