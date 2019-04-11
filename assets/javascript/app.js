$(document).ready(function() {

    /* Global variable declarations */
    const limitStr = 10;
    const ratingStr = 'G';
    let topicsArr = ['science', 'platypus', 'canada', 'baseball', 'wolf'];

    /* Event Handlers and functions to run immediately */

    // creates buttons for topics in topicsArr at site launch
    makeButtons();

    // event handler for submit text field /form note the submit is attached 
    // to the form element and we get the text field input w/ the submit-text Id
    $('#submit-form').on('submit', function(event) {
        event.preventDefault();
        var answer = $('#submit-text').val();
        // validate whether input field is empty. If yes, then return false and don't proceed
        if (answer === '') {
            return false;
        }
        // Put newly submitted topic into the topics array
        topicsArr.push(answer);
        newButton(answer);
    });

    // event handler for topic buttons (those generated at startup and custom ones)
    // when pressed, builds and sends api request
    $(document).on('click', '.submitable', function(event) {
        event.preventDefault();
        var answer = $(this).attr('data');
        buildAPIQuery(answer);
    });

    // Event Handler for Remove button - removes last value from TopicsArr
    // removes last element of topicsArr and button on screen. Currently removes giphys also
    $('#removebtn').on('click', function(event) {
        event.preventDefault();
        topicsArr.pop();
        $('#gifs-here').empty();
        makeButtons();
    });

    // Event handler for images. click image and toggle from static to animated state
    // note use of document.on - need to use b/c the elements w/ class=image are dynamically
    // generated and we can't rely on the images being there initially
    // note use of "this" to hold the appropriate img element for processing
    $(document).on('click', '.image', function() {
        event.preventDefault();
        var state = $(this).attr('data-state');
        var idAttr = $(this).attr('id');
        imgStateToggle(state, idAttr);
    });

    /* Functions   */

    // function to make buttons from topics array to seed page
    function makeButtons() {
        $('#buttons-here').empty();
        for (var i = 0; i < topicsArr.length; i++) {
            var giphyButton = $('<button>');
            giphyButton.addClass('submitable custombtn btn btn-primary');
            giphyButton.attr('data', topicsArr[i]);
            giphyButton.text(topicsArr[i]);
            $('#buttons-here').append(giphyButton);
        }
    }

    // function to create buttons from form submit
    function newButton(topicStr) {
        var giphyButton = $('<button>');
        giphyButton.addClass('custombtn btn btn-primary submitable');
        giphyButton.attr('data', topicStr);
        giphyButton.text(topicStr);
        $('#buttons-here').append(giphyButton);
        buildAPIQuery(topicStr);
    }

    //Function to BUILD API from form submit 
    //Called from newButton and Submit button
    function buildAPIQuery(topicStr) {
        const urlStr = 'https://api.giphy.com/v1/gifs/search?';
        const apiKeyStr = 'dkQ0WtKAajp9NhC80EekhFeAswJO7B9j';
        let queryURL = (urlStr + 'q=' + topicStr + '&api_key=' + apiKeyStr + '&rating=' + ratingStr + '&limit=' + limitStr);
        makeAPIRequest(queryURL);
    }

    //Function to make Giphy AJAX request from buildAPIQuery
    function makeAPIRequest(queryURL) {
        $.ajax({
                url: queryURL,
                method: 'GET',
            })
            .then(function(response) {
                var result = response.data;
                // Make sure there is a response
                if (result === '') {
                    return false;
                } else {
                    generateGIFs(result);
                }
            });
    }

    // function to generate HTML and display images and ratings
    // each "image" has 3 components, a div wrapper, the img , and the rating
    function generateGIFs(result) {
        $('#gifs-here').empty();
        for (var i = 0; i < result.length; i++) {
            var gifImage = $('<img>');
            var gifDiv = $('<div>');
            var gifRating = $('<p>').text('Rating ' + (result[i].rating).toUpperCase());
            var stillImgSrc = result[i].images.fixed_height_small_still.url;
            var animateImgSrc = result[i].images.fixed_height_small.url
            gifDiv.addClass('imgdisplay');
            gifRating.addClass('ratingdisplay');
            gifImage.attr('role', 'button');
            gifImage.attr('data-state', 'still');
            gifImage.attr('src', stillImgSrc);
            gifImage.attr('data-still', stillImgSrc);
            gifImage.attr('data-animate', animateImgSrc);
            // create a unique id for each gif based on id data from returned JSON
            // allows us to keep track of which image was clicked and act on correct image
            gifImage.attr('id', result[i].id);
            gifImage.addClass('image');
            gifDiv.append(gifImage);
            gifDiv.append(gifRating);
            $('#gifs-here').prepend(gifDiv);
        }
    }

    // toggles state of img from still to animate and back with a click

    function imgStateToggle(state, idAttr) {
        var imgId = $('.image').attr('id');
        imgId = ("#" + idAttr);
        if (state === 'still') {
            var animateImgSrc = $(imgId).attr('data-animate');
            $(imgId).attr('src', animateImgSrc);
            $(imgId).attr('data-state', 'animate');
            animateImgSrc = '';
            imgId = '';
        } else {
            var stillImgSrc = $(imgId).attr('data-still');
            $(imgId).attr('src', stillImgSrc);
            $(imgId).attr('data-state', 'still');
            stillImgSrc = '';
            imgId = '';
        }
    }
});