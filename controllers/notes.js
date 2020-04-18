const Note = require("../models/note");
const makeDate = require("../scripts/date");

module.exports = {
    get: function(data, cb) {
        Note.find({
            _articleId: data._id
        }, cb);
    },
    save: function (data, cb) { 
        let newNote = {
            _articleId: data._id,
            data: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
     },
     remove: function (data, cb) {  
         Note.remove({
             _id: data._id
         }, cb);
     }
};