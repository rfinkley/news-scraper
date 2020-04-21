const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    date: String,
    noteText: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;