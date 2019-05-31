/* Highlight nav link if section is in focus */
$('body').scrollspy({ target: '#navbar-main' });

(function() {
  
  var $imgs = $('#gallery img');
  var $buttons = $('#buttons');
  var tagged = {};
  
  $imgs.each(function() {
    
    var img = this;
    var tags = $(this).data('tags');
    
    if (tags) {
      tags.split(',').forEach(function(tagName) {
        if (tagged[tagName] == null) {
          tagged[tagName] = [];
        }
        tagged[tagName].push(img);
      });
    }
    
    var min = -20;
    var max = 20;
    
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
  
    var cssObj = {
      '-ms-transform': 'rotate(' + random + 'deg)',               // IE 9
      '-webkit-transform': 'rotate(' + random + 'deg)',           // Chrome, Safari, Opera
      'transform': 'rotate(' + random + 'deg)'
    };

    // $(this).css(cssObj);
    
  });
  
  $('<button/>', {                                 // Create empty button
    text: 'Show All',                              // Add text 'show all'
    class: 'active',                               // Make it active
    click: function() {                            // Add onclick handler to
      $(this)                                      // Get the clicked on button
        .addClass('active')                        // Add the class of active
        .siblings()                                // Get its siblings
        .removeClass('active');                    // Remove active from siblings
      $imgs.show();                                // Show all images
    }
  }).appendTo($buttons);                           // Add to buttons

  $.each(tagged, function(tagName) {               // For each tag name
    $('<button/>', {                               // Create empty button
      text: tagName + ' (' + tagged[tagName].length + ')', // Add tag name
      click: function() {                          // Add click handler
        $(this)                                    // The button clicked on
          .addClass('active')                      // Make clicked item active
          .siblings()                              // Get its siblings
          .removeClass('active');                  // Remove active from siblings
        $imgs                                      // With all of the images
          .hide()                                  // Hide them
          .filter(tagged[tagName])                 // Find ones with this tag
          .show();                                 // Show just those images
      }
    }).appendTo($buttons);                         // Add to the buttons
  });
  
}());

$("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});