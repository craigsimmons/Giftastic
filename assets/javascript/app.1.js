$(document).ready(function() {

    /*  Variable declaration  */
    var queryStr = "";
    var gifyObj;
    var urlStr = "https://api.giphy.com/v1/gifs/search?"
    var apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];
    var topicStr = "";
    var giphyButton = "";

    /* event handlers and global logic/code  */
    // clears old buttons and images

    $("#buttons-here").empty();
    $("#gifs-here").empty();
    makeButtons();

    buildAPIQuery();


    function buildAPIQuery() {
        // topicStr = $(this).value("#input-topic");
        topicStr = "walrus"
        console.log(topicStr);
        qStr = topicStr;
        queryStr = (urlStr + "q=" + qStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(queryStr);
        makeAPIRequest()
    }

    function makeAPIRequest() {
        $.ajax({
                url: queryStr,
                method: "GET",
            })
            .then(function(result) {
                console.log(queryStr);
                gifyObj = result;
                console.log(gifyObj);
            });
    }

    function makeButtons() {
        $("#buttons-here").empty();
        for (var i = 0; i < topicsArr.length; i++) {
            giphyButton = $("<button>");
            giphyButton.addClass("custombtn btn btn-primary");
            giphyButton.attr("data", topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $("#buttons-here").append(giphyButton);
        }
    }







    function buildAPIQuery() {
        topicStr = $(this).attr("#input-topic");
        console.log(topicStr);
        qStr = topicStr;
        queryStr = (urlStr + "q=" + topicStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(queryStr);
        makeAPIRequest()
    }

    function makeAPIRequest() {
        $.ajax({
                url: queryStr,
                method: "GET"
            })
            .then(function(result) {
                console.log(queryStr);
                gifyObj = result;
                console.log(gifyObj);
            });
    }



});