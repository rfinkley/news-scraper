// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

const scrape = cb => {
    axios.get("https://www.smashingmagazine.com/articles/").then(res => {
        const $ = cheerio.load(res.data);
        let articles = [];
        $(".article--post").each(function(i, element) {

            let author = $(element).children("header").text().trim();
            let title = $(element).children(".article--post__title").text().trim();
            let summary = $(element).children(".article--post__content").text().trim();
            let date = $(element).children(".article--post__content").children(".article--post__teaser").children("time").text().trim();

            if (title && summary) {
                let titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                let summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let data = {
                    title: titleNeat,
                    author: author,
                    summary: summaryNeat,
                    date: date
                };

                articles.push(data);
            };
        });
        cb(articles);
    });
};

module.exports = scrape;
