$(document).ready(function() {

    /* Global variable declarations */
    var limitStr = 10;
    var ratingStr = "G";
    var topicsArr = ['dog', 'cat', 'fuck', 'bat', 'wolf'];

    /* Event Handlers and functions to run immediately */
    makeButtons();

    $("#submit-form").on("submit", function(event) {
        event.preventDefault();
        var answer = $("#submit-text").val();
        if (answer === "") {
            return false;
        }
        topicsArr.push(answer);
        newButton(answer);
    });

    $(document).on("click", ".submitable", function(event) {
        event.preventDefault();
        var answer = $(this).attr("data");
        buildAPIQuery(answer);
    });

    //$(document).on("click", ".image", function() 
    

    $("img").click( function(event) { 
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            console.log("animate");
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            console.log("still");
        }
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
        buildAPIQuery(topicStr);

    }

    function removeButton() {
	    $("removeBtn").on("click", function() {
		    topicsArr.pop();
		    displayGifButtons();
		    return false;
        });
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
                if (result === "") {
                    return false;  
                }
                else {
                    generateGIFs(result);
                }
            });
    }

    function generateGIFs(result) {
        $("#gifs-here").empty();
        for (var i = 0; i<result.length; i++){
            var gifImage = $("<img>");
            var gifDiv = $("<div>");       
            var gifRating = $("<p>").text("Rating " + (result[i].rating).toUpperCase());
            gifDiv.addClass("imgdisplay");
            gifRating.addClass("ratingdisplay");
            gifImage.attr("data-state", "still");
			gifImage.attr("src", result[i].images.fixed_height_small_still.url);
			gifImage.attr("data-still", result[i].images.fixed_height_small_still.url);
			gifImage.attr("data-animate", result[i].images.fixed_height_small.url);
			gifImage.addClass("image");
            gifDiv.append(gifImage);
            gifDiv.append(gifRating);
			$("#gifs-here").prepend(gifDiv);
        }
    }
}); 