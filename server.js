var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/smashingMagScraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } , err => {
  if (err) {
    console.log(err);
  } else {
    console.log("mongoose connection is successful");
  }
});

// mongoose.connect("mongodb://localhost/news-scraper", { useNewUrlParser: true });

// Import routes and give the server access to them.
var router = express.Router();
require("./config/routes")(router);

app.use(router);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
