var heroes = ["Batman", "Superman", "Spiderman", "Wonderwoman", "Ironman"];
function addSearchBtns() {
  $("#buttons").html("");
  for (i = 0; i < heroes.length; i++) {
    var $button = $("<input type='button' class='btn btn-sm search-btn' />");
    $button.val(heroes[i]);
    $("#buttons").append($button);
  }
}
addSearchBtns();

$(document).on("click", ".btn", function() {
  $("#results").html("");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 10,
    api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
    
  };
  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  } else if ($("#user-search").val() !== "") {
    query = $("#user-search").val();
    heroes.push(query);
    if (heroes.length > 6) {
      heroes.shift();
    }
    addSearchBtns();
  }
  params.q = query;

  if ($(this).hasClass("trending")) {
    queryURL = "https://api.giphy.com/v1/gifs/trending?";
    delete params.q;
  }

  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function(r) {
      for (i = 0; i < params.limit; i++) {
        var $img = $("<img>");
        var $div = $("<div>");
        var $rating = $("<h6>");
        var gifObj = r.data[i];
        var gif = gifObj.images;

        
        $img.attr({
          
          src: gif.fixed_height_still.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height_still.url,
          "data-state": "still",
          class: "gif"
        });
        
        $div.addClass("gif-box");
        $rating.text("Rating: " + gifObj.rating);
        $div.append($img, $rating);
        $("#results").append($div);
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    }
  });
});