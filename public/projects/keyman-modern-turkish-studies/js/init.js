
  $(document).ready(function(){
    $window = $(window);        // cache the window object


  $("#events-show-more").click(function() {
    $(".show-more-content").css("display", "block");
     $("#events-show-more").css("display", "none");
     $("#events-show-less").css("display", "block");
  });
  $("#events-show-less").click(function(e) {
     $("#events-show-less").css("display", "none");
     $("#events-show-more").css("display", "block");
      var menu = $(".menu"),
      navBar = $("#header"),
      navBarHeight = navBar.outerHeight()+1;
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-navBarHeight;
      $('html, body').stop().animate({ 
        scrollTop: offsetTop
      }, 400, function() {
      });
      var contentDiv = $(".show-more-content");
      contentDiv.slideUp(400, function() {
        contentDiv.css("display", "none");
    });
    e.preventDefault();
  });

}); // close out script

// Create HTML5 element for IE
document.createElement("section");