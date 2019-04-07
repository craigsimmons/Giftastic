$(document).ready(function () {

    /*  Variable declaration  */
    var queryStr = "";
    var gifyObj;
    var urlStr = "https://api.giphy.com/v1/gifs/search?"
    var apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];
    var topicStr = "";
    var giphyButton;

    /* event handlers and global logic/code  */
    // clears old buttons and images
    buildGiphyButtons();


    $("#input-topic").on("click", function () {
        event.preventDefault();
        buildAPIQuery();
    });

    function buildAPIQuery() {
        topicStr = $(this).attr("#input-topic");
        console.log(topicStr);
        queryStr = (urlStr + "q=" + topicStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(queryStr);
        makeAPIRequest();
    }

    function makeAPIRequest() {
        $.ajax({
            url: queryStr, 
            method: "GET"
        })
        .then(function (result) {
            console.log(queryStr);
            gifyObj = result;
            console.log(gifyObj);
        });
    }

    // function to create new buttons from the topics array - prepopulate screen with some buttons
    function makeButtons() {
        for (var i = 0; i < topicsArr.length; i++) {
            topicButton = $("<button type=" + "button" + ">" + topicsArr[i]
                + "</button>").addClass("custombtn btn btn-primary").attr("data", topicsArr[i]);
            $("#buttons-here").append(topicButton);
        };
    }

    function makeNewButtons() {
        topicButton = $("<button type=" + "button" + ">" + topicStr
            + "</button>").addClass("custombtn btn btn-primary").attr("data", topicStr);
        $("#buttons-here").append(topicButton);
}

    function buildGiphyButtons() {
        $("#buttons-here").empty();
        for (var i = 0; i < topicsArr.length; i++) {
            giphyButton = $("<button>");
            giphyButton.addClass("custombtn btn btn-primary");
            giphyButton.attr("data", topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $("#buttons-here").append(giphyButton);
    }
}

});


