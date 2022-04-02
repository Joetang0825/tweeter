/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Execute client side Javascript once DOM is ready
$(document).ready(function () {

  // Create HTML section of a tweet
  const createTweetElement = function (tweet) {
    // Use timeago to display when the tweet was created
    time = timeago.format(tweet.created_at);

    let $tweet =
      `<article class="tweetContainer">
          <header class="tweetHeader">
            <div>
              <img src=${tweet.user.avatars} alt="Avatar" class="avatar">
              <span class="fullName">${tweet.user.name}</span>           
            </div>
            <span class="userName">${tweet.user.handle}</span>  
          </header>
          <div class="tweetContent">
            <span>${escape(tweet.content.text)}</span>
          </div>
          <footer class="tweetFooter">
            <span>${time}</span>
            <div class="tweetIcons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>

      <br>
      <br>`;
    return $tweet;
  }

  // Render all tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");

    $tweetsContainer.empty();

    // Display tweets in descending order
    for (let i = tweets.length - 1; i >= 0; i--) {
      $tweetsContainer.append(createTweetElement(tweets[i]));
    }

  }

  // Escape user input to avoid cross-site script like <script>alert('hihi')</script>
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create an event listener for a submit event
  $("form").submit(function (event) {

    // Prevent the default behaviour of the submit event (e.g. data submission and page refresh)
    event.preventDefault();
    // Serialize the form data and send it to the server as a query string
    let text = $(this).serialize();

    // Configuration for AJAX POST request
    const configPOST = {
      url: `/tweets/`,
      method: "POST",
      data: text,

      success: (data) => {
        loadtweets();
      },

      error: (error) => {
        console.log("err", error);
      },
    };

    // Extract user input and replace '%20' (user entered space) to ' ' to calculate right # of characters

    // Remove the 'text=' portion
    let content = text.slice(5);
    content = content.replaceAll('%20', ' ');

    // Display validation error message if user's input is empty
    // Clear all other validation error message if they are displayed
    if (!content) {
      $(this).parent().parent().find('#error2').slideDown("slow");
      $(this).parent().parent().find('#error1').css("display", "none");
      return;
    }
    // Display validation error message if user's input is longer than 140 characters
    // Clear all other validation error message if they are displayed
    else if (content.length > 140) {
      //$(this).parent().parent().find('#error1').css("display", "block");
      $(this).parent().parent().find('#error1').slideDown("slow");
      $(this).parent().parent().find('#error2').css("display", "none");
      return;
    }

    $.ajax(configPOST);

    // clear the content in textbox and reset the character counter to 140
    $(this).find('#tweet-text').val('');
    $(this).find('.counter').val(140);

    // Hide the error messages if there's no more validation errors
    $(this).parent().parent().find('#error1').css("display", "none");
    $(this).parent().parent().find('#error2').css("display", "none");

  });

  // Load tweets by creating a AJAX GET request
  const loadtweets = function () {

    const configGET = {
      url: `/tweets/`,
      method: "GET",

      success: (data) => {
        renderTweets(data);
      },

      error: (error) => {
        console.log("err", error);
      },
    };

    $.ajax(configGET);

  }

  loadtweets();

});

