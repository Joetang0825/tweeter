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
            <span>${tweet.content.text}</span>
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
    tweets.forEach((tweet) => {
      $tweetsContainer.append(createTweetElement(tweet));
    });
  }



  $("form").submit(function (event) {
    event.preventDefault();
    let text = ($(this).serialize());

    const configPOST = {
      url: `/tweets/`,
      method: "POST",
      data: text,

      success: (data) => {
        console.log('success')
      },

      error: (error) => {
        console.log("err", error);
      },
    };

    $.ajax(configPOST);

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

