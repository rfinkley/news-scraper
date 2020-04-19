$(document).ready( () => {
    
    let clearArticles = () => {
        articleContainer.empty();
        $.get("/api/articles?saved=false")
            .then(data => {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }

    let renderArticles = articles => {
        let articleSections = [];
        articles.forEach(article => {
            articleSections.push(createSection(article))
        });
        articleContainer.append(articleSections);
    }

    let createSection = article => {
        let section = 
            $(["<section class='row'>",
                "<article class='three-quarter'>",
                "<h3 class='article-author'>",
                article.author,
                "</h3>",
                "<h2 class='article-title'>",
                article.title,
                "</h2>",
                "<p class='article-text'>",
                article.summary,
                "</p>",
                "</article>",
                "<aside class='quarter'>",
                "<ul class='aside-list'>",
                "<li><a href='#' data-article='",
                article._id,
                "' class='btn-save'><i class='fas fa-save'></i></a> </li></ul></aside>",
                "</section>",
            ].join(""));
            $.data(section,"_id", article._id);
            return section;
    }

    let renderEmpty = () => {
        const noArticles = 
            $(["<div class='no-articles'>",
                "<h1>Oops! It looks like there are no new articles!</h1>",
              "</div>"
            ].join(""));
            articleContainer.append(noArticles);
    }

    let saveArticle = function () {
        let articleToSave = $(this).attr("data-article");
        console.log(articleToSave);
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        })
        .then(function(data) {
            if (data.ok) {
                clearArticles();
            }
        });
    }

    let scrapeArticles = () => {
        $.get("api/fetch")
            .then(data => {
                clearArticles();
                alert(data.message);
            })
    }

    let articleContainer = $(".article-container");
    $(document).on('click', '.btn-save', saveArticle);
    $(document).on('click', '.scrape', scrapeArticles);
    clearArticles();

})

