var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var Article = require("../models/article");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            let articles = data;
            articles.forEach(function(article) {
                article.date = makeDate();
                article.saved = false;
                article.publishDate = Date.parse(article.publishDate);
            })
            Article.collection.insertMany(articles, {ordered: false}, function(err, docs) {
                cb(err, docs);
            })
        })
    },
    delete: function(query, cb) {
        Article.remove(query, cb);
    },
    get: function(query, cb) {
        Article.find(query)
        .sort({
            publishDate: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Article.update({_id:query._id}, {
            $set: query
        }, {}, cb);
    }
}