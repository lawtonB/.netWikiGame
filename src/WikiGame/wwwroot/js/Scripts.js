$(document).ready(function () {
    var input = $('input');
    var button = $('.wiki');
    var articles = $('.articles');
    var search = " ";
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

    var clicks = 0;

    button.click(function () {
        articles.empty();
        //search = input.val();
        ajaxArticleData();
        $('.goaltitle').append(input.val());
        clicks++;
    });

  

    var ClickCounterViewModel = function () {
        this.numberOfClicks = ko.observable(0);

        this.registerClick = function () {
            this.numberOfClicks(this.numberOfClicks() + 1);
        };
    };

    ko.applyBindings(new ClickCounterViewModel());

    $('body').on('click', '.link', function () {
        console.log(this);
        var textLink = $(this).text()
        console.log(textLink);
        search = textLink
        $(".articles").empty();
        ajaxArticleData();
    });

    var ajaxArticleData = function () {
        if (clicks == 0) {
            var generatorType = 'random';
        } else {
            generatorType = 'search';
        }
   
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: searchUrl,
                data: {
                    action: 'query',
                    format: 'json',
                    prop: 'links',
                    pllimit: "max",
                    //titles: search,
                    generator: generatorType,
                    gsrsearch: search,
                    grnnamespace: 0,



                },
                success: function (json) {
                    var pages = json.query.pages;
                    //for each pages call it page then do{x}
                    $.map(pages, function (page) {
                        var pageElement = $('<div>');

                        //get the article title
                        $('.articles').append($('<h2>').text(page.title));

                        $.map(page.links, function (link) {

                            $('.articles').append($('<p><span class="link">' + link.title + '</span></p>'));
                        });

                        pageElement.append($('<hr>'));

                        articles.append(pageElement);
                    });
                }
            })
    };
});