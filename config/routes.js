module.exports = routes => {
    routes.get("/", (req, res) => {
        res.render("index");
    });
    routes.get("/saved", (req, res) => {
        res.render("saved");
    });
};