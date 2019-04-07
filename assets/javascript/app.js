$(document).ready(function() {

    /* Global variable declarations */
    var urlStr = "https://api.giphy.com/v1/gifs/search?"
    var apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];
    var topicStr = "";
    var queryURL = "";

    /* Event Handlers */
    $("#submit-form").click(function() {
        event.preventDefault();
        buildAPIQuery();
        makeButtons();
    });


    function buildAPIQuery() {
        //topicStr = $(this).attr("#input-topic");
        topicStr = "snake"
        queryStr = (urlStr + "q=" + topicStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(topicStr);
        console.log(queryStr);
        makeAPIRequest();
    }

    function makeAPIRequest() {
        $.ajax({
                url: queryStr,
                method: "GET",
            })
            .then(function(result) {
                gifyObj = result;
                console.log(gifyObj);
            });
    }

    function makeButtons() {
        $("#buttons-here").empty();
        for (var i = 0; i < topicsArr.length; i++) {
            giphyButton = $("<button>");
            console.log(giphyButton);
            giphyButton.addClass("custombtn btn btn-primary");
            giphyButton.attr("data", topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $("#buttons-here").append(giphyButton);
        }
    }
});