$(document).ready(function() {

    /* Global variable declarations */
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];
    var topicStr = "";

    /* Event Handlers and functions to run immediately */
    makeButtons();

    $("#submit-form").on("submit", function(event) {
        event.preventDefault();
        var answer = $("#submit-text").val();
        if (answer === "") {
            return false;
        }
        topicsArr.push(answer);
        console.log(answer);
        newButton(answer);
        console.log(topicsArr);
    });

    $(document).on("click", ".submitable", function(event) {
        event.preventDefault();
        var answer = $(this).attr("data");
        console.log(answer);
        buildAPIQuery(answer);
    });

/* functions   */

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

    function newButton(topicStr) {
        var giphyButton = $("<button>");
        giphyButton.addClass("custombtn btn btn-primary submitable");
        giphyButton.attr("data", topicStr);
        giphyButton.text(topicStr);
        $("#buttons-here").append(giphyButton);
    }

    function buildAPIQuery(topicStr) {
        const urlStr = "https://api.giphy.com/v1/gifs/search?";
        const apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";    
        console.log(topicStr);
        let queryURL = (urlStr + "q=" + topicStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
        console.log(queryURL);
        makeAPIRequest(queryURL);
    }

    function makeAPIRequest(queryURL) {
        $.ajax({
                url: queryURL,
                method: "GET",
            })
            .then(function(response) {
                var result = response.data;
                console.log(result);
                if (result === "") {
                    console.log("nada");
                    return false;  
                }
                else {
                console.log("oh yeah, theres 10 objects");
                generateGIFs(result);
                }
            });
    }

    function generateGIFs(result) {
        $("#gifsView").empty();
        for (var i = 0; i<result.length; i++){
            var gifImage = $("<img>");
            var gifDiv = $("<div>");
            var gifRating = $("<p>").text("Rating " + result[i].rating);
            gifDiv.addClass("imgdisplay");
            gifRating.addClass("ratingdisplay");
			gifImage.attr("src", result[i].images.fixed_height_small_still.url);
			gifImage.attr("data-still", result[i].images.fixed_height_small_still.url);
			gifImage.attr("data-animate", result[i].images.fixed_height_small.url);
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
            gifDiv.append(gifImage);
            gifDiv.append(gifRating);
			$("#gifs-here").prepend(gifDiv);
        }
    }
}); 