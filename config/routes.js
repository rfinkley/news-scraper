const scrape = require("../scripts/scrape");
const articles = require("../controllers/articles")
const notes = require("../controllers/notes");

module.exports = routes => {
    routes.get("/", (req, res) => {
        res.render("index");
    });
    routes.get("/saved", (req, res) => {
        res.render("saved");
    });
    routes.get("/api/fetch", function (req, res) {
        articles.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    routes.get("/api/articles", function(req, res) {
        let query = {};
        if (req.query.saved) {
            query = req.query;
        }
        articles.get(query, function(data) {
            res.json(data);
        });
    });
    routes.delete("/api/articles/:id", function (req, res) {
        let query = {};
        query._id = req.params.id;
        articles.delete(query, function(err, data) {
            res.json(data);
        });
    });
    routes.patch("/api/articles", function (req, res) { 
        console.log("Routes req.body: ");
        console.log(req.body);
        articles.update(req.body, function (err, data) {  
            res.json(data);
        });
    });
    routes.get("/api/notes/:article_id?", function(req, res) {
        let query = {};
        if (req.params.article_id) {
            query.id = req.params.article_id;
        }
        notes.get(query, function(err, data) {
            res.json(data);
        });
    });
    routes.delete("/api/notes/:id", function(req, res) {
        let query = {};
        query._id = req.params.id;
        notes.remove(query, function(err, data) {
            res.json(data);
        });
    });
    routes.post("/api/notes", function (req, res) { 
        notes.save(req.body, function(data) {
            res.json(data);
        });
     });
};