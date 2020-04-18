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
            let title = $(this).children(".article--post__title").text().trim();
            let author = $(this).children(".article--post__author-name").text().trim();
            let summary = $(this).children(".article--post__teaser").text().trim();
            let date = $(this).children("time").text().trim();

            if (title && summary) {
                let titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                let summaryNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                let data = {
                    title: title,
                    author: author,
                    summary: summary,
                    date: date
                };

                articles.push(data);
            };
        });
        cb(articles);
    });
};

module.exports = scrape;
