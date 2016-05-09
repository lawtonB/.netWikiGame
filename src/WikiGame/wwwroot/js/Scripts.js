$(document).ready(function () {
    var input = $('input');
    var button = $('.wiki');
    var articles = $('.articles');
    var search = " ";
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

    button.click(function () {
        articles.empty();
        search = input.val();
        ajaxArticleData();
    });

    $('body').on('click', '.link', function () {
        console.log(this);
        var textLink = document.getElementById(this);
        search = textLink.innerHtml;
        ajaxArticleData();
    });

    var ajaxArticleData = function () {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: searchUrl,
            data: {
                action: 'query',
                format: 'json',
                prop: 'links',
                pllimit: 500,
                titles: search,
                

            },
            success: function (json) {
                var pages = json.query.pages;
                $.map(pages, function (page) {
                    var pageElement = $('<div>');

                    //get the article title
                    pageElement.append($('<h2>').text(page.title));

                    $.map(page.links, function (link) {

                        $('.articles').append($('<span class="link">' + link.title + '</span>'));
                    });

                    pageElement.append($('<hr>'));

                    articles.append(pageElement);
                });
            }
        })
    };
});