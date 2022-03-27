/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {
  const createTweetElement = function (tweet) {
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

  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();

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


  $("form").submit(function (event) {
    event.preventDefault();
    let text = escape($(this).serialize());

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

    // Extract user input and replace '%20' (user input space) to ' ' to calculate right # of characters
    let content = text.slice(5);
    content = content.replaceAll('%20', ' ');
    console.log('text ' + content);
    console.log('text length: ' + content.length);


    if (!content) {
      $(this).parent().parent().find('#error2').slideDown("slow");
      $(this).parent().parent().find('#error1').css("display", "none");
      return;
    }
    else if (content.length > 140) {
      //$(this).parent().parent().find('#error1').css("display", "block");
      $(this).parent().parent().find('#error1').slideDown("slow");
      $(this).parent().parent().find('#error2').css("display", "none");
      return;
    }

    $.ajax(configPOST);

    // clear the content in textbox
    $(this).find('#tweet-text').val('');
    $(this).find('.counter').val(140);

    // Hide the error messages if there's no more validation errors
    $(this).parent().parent().find('#error1').css("display", "none");
    $(this).parent().parent().find('#error2').css("display", "none");

  });

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

