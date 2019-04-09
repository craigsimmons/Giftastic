$(document).ready(function() {

    /* Global variable declarations */
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];

    /* Event Handlers and functions to run immediately */

    makeButtons();
    // event handler for submit text field /form WORKING
    $("#submit-form").on("submit", function(event) {
        event.preventDefault();
        var answer = $("#submit-text").val();
        if (answer === "") {
            return false;
        }
        topicsArr.push(answer);
        newButton(answer);
    });

    // event handler for topic buttons. when pressed, sends api request/ all WORKING
    $(document).on("click", ".submitable", function(event) {
        event.preventDefault();
        var answer = $(this).attr("data");
        buildAPIQuery(answer);
    });

    // neither works below
    // $(document).on("click", "#gifs-here", newButton("chicken"));
    /*  $(document).on("click", "#buttons-here", newButton("rooster"));
    $("#removebtn").on("click", function() {
        event.preventDefault();
        $("#buttons-here").empty();
        $("#gifs-here").empty();
    });
    */
    // Below is working. need to fix logic
    $("#removebtn").on("click", function(name) {
        event.preventDefault();
        var answer = $(this).attr("data");
        topicsArr.pop();
        makeButtons();
    });


    //not working
    $(".image").on("click", function(event) {
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr('data-state', 'animate');
            console.log("animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr('data-state', 'still');
            console.log("still");
        }
    });
    /*
function evalImgState()  {
    var state = $(this).attr('data-state');
        console.log(state);
    if (state === "still")
}
*/
    /* functions   */
    // function to make buttons from topics array to seed page / WORKING
    function makeButtons() {
        $("#buttons-here").empty();
        for (var i = 0; i < topicsArr.length; i++) {
            var giphyButton = $("<button>");
            giphyButton.addClass("submitable custombtn btn btn-primary");
            giphyButton.attr("data", topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $("#buttons-here").append(giphyButton);
        }
    }
    // function to create buttons from form submit / WORKING
    function newButton(topicStr) {
        var giphyButton = $("<button>");
        giphyButton.addClass("custombtn btn btn-primary submitable");
        giphyButton.attr("data", topicStr);
        giphyButton.text(topicStr);
        $("#buttons-here").append(giphyButton);
        buildAPIQuery(topicStr);
    }
    // NOT WORKING - remove button not clicking
    $("fucker").on("click", function() {
        $("#buttons-here").empty();
        console.log(topicsArr);
        topicsArr = topicsArr.pop();
        console.log(topicsArr);
        displayGifButtons();
        return false;
    });
    //Function to BUILD API from form submit / WORKING
    //Called from newButton and Submit button
    function buildAPIQuery(topicStr) {
        const urlStr = "https://api.giphy.com/v1/gifs/search?";
        const apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
        console.log(topicStr);
        let queryURL = (urlStr + "q=" + topicStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(queryURL);
        makeAPIRequest(queryURL);
    }
    //Function to make Giphy request from buildAPIQuery / WORKING
    function makeAPIRequest(queryURL) {
        $.ajax({
                url: queryURL,
                method: "GET",
            })
            .then(function(response) {
                var result = response.data;
                if (result === "") {
                    return false;
                } else {
                    generateGIFs(result);
                }
            });
    }

    // function to generate HTML and display images and ratings - WORKING
    function generateGIFs(result) {
        $("#gifs-here").empty();
        for (var i = 0; i < result.length; i++) {
            var gifImage = $("<img>");
            var gifDiv = $("<div>");
            var gifRating = $("<p>").text("Rating " + (result[i].rating).toUpperCase());
            var stillImgSrc = result[i].images.fixed_height_small.url;
            var animateImgSrc = result[i].images.fixed_height_small.url
            gifDiv.addClass("imgdisplay");
            gifRating.addClass("ratingdisplay");
            gifImage.attr("data-state", "still");
            gifImage.attr("src", stillImgSrc);
            gifImage.attr("data-still", stillImgSrc);
            gifImage.attr("data-animate", animateImgSrc);
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            gifDiv.append(gifRating);
            $("#gifs-here").prepend(gifDiv);

        }
    }
});