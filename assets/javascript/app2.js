$(document).ready(function() {

/*  Variable declaration  */
var queryStr = "";
var gifyObj;
var urlStr = "https://api.giphy.com/v1/gifs/search?"
var apiKeyStr = "dkQ0WtKAajp9NhC80EekhFeAswJO7B9j";
var qStr = "cat";
var limitStr = 10;
var ratingStr = "G";
// Declaring Initial Array of Topics to populate screen with initial buttons
var topicsArr = ['dog', 'cat', 'spider', 'bat', 'wolf', 'bird', 'snake', 'bear', 'horse', 'platypus'];
var topicStr = "";
var newTopicStr = "";
// use to store state of gif: animated or still. use to set/reset attr
var gifState = "";
var topicImage;
var imageUrl;

/* event handlers and global logic/code  */
// clears old buttons and images
$("#buttons-here").empty();
$("#gifs-here").empty();
makeButtons();

$("#input-topic").on("click", function() {
    topicStr = $(this).attr("#input-topic");
    console.log(topicStr);
});


function buildAPIQuery() {
    topicStr = $(this).attr("#input-topic");
    console.log(topicStr);
    qStr = topicStr;
    queryStr = (urlStr + "q=" + qStr + "&api_key=" + apiKeyStr + "&rating=" + ratingStr + "&limit=" + limitStr);
    console.log(queryStr);
    makeAPIRequest()
}

function makeAPIRequest() {
    $.ajax({url: queryStr, success: function(result){
        console.log(queryStr);
        gifyObj = result;
        console.log(gifyObj);
        // $("#gifs-here").html(result);
      }});
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
    };
}

)
