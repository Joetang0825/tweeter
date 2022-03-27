// Count number of characters user entered
$(document).ready(function () {
  let count = 140;

  // Event handler to the textarea element 
  $("#tweet-text").on('input', function () {
    let charCount = 0;
    charCount = $(this).val().length;

    // If the counter > 140, set the number to negative and change the font color to red
    if (charCount > 140) {
      charCount = 140 - charCount;

      // Navigate the DOM to find the .counter element
      // This update is more efficient performance wise compared to use $('.counter') directly
      $(this).parent().parent().find('.counter').css("color", "red");
    }
    // If 0 <= counter <= 140, update the font color to black
    else {
      $(this).parent().parent().find('.counter').css("color", "black");
    }

    // Update the counter on the page
    $(this).parent().parent().find('.counter').val(charCount);

  });
});

