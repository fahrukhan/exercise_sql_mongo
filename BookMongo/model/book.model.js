const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Library = new Schema({
    title: { 
        type: String },
    author: { 
        type: String },
    published_date: { 
        type: String },
    pages: { 
        type: Number },
    language: { 
        type: String },
    published_id: { 
        type: String }
},{
    collection: 'books'
});

module.exports = mongoose.model("Library", Library);