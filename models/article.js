const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;