$(document).ready(function() {

    var urlStr = "https://api.giphy.com/v1/gifs/search?"
    var apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];
    var topicStr = "";
    var giphyButton = "";
    var queryURL = "";
    /*
        ("#submitbtn").on("submit", function() {
            event.preventDefault()
            console.log("working?");
        });
    */



    // loadTopicArray();
    createButtons();
    /*
        var queryURL = (urlStr + "q=" + "walrus" + "&api_key=" + apiKeyStr + "&limit=" + limitStr + "&rating=" + ratingStr)
        console.log(queryURL)
    */
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    function loadTopicArray() {
        for (var i = 0; i < topicsArr.length; i++) {
            var queryURL = (urlStr + "q=" + topicsArr[i] + "&api_key=" + apiKeyStr + "&limit=" + limitStr + "&rating=" + ratingStr);
            console.log(queryURL);
        }
    }

    function createButtons() {
        for (var i = 0; i < topicsArr.length; i++) {
            giphyButton = $("<button>");
            console.log("Just button element" + giphyButton);
            giphyButton.addClass("custombtn btn btn-primary");
            giphyButton.attr("data", topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $("#buttons-here").append(giphyButton);
        }
    }

});