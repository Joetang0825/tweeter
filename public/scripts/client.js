/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {
  const createTweetElement = function (tweet) {
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
            <span>${tweet.created_at}</span>
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

  renderTweets(data);


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

