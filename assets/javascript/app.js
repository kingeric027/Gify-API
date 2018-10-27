
 
var animals = ["dog","cat","bird","skunk","snake","mouse"];
var key = "blKnNd217LJCoURwnxs6sk1pazj1sLoY";

// Function for displaying gifs
function renderButtons() {
    // Deletes the movies prior to adding new movies
    $("#buttons-view").empty();

    // Loops through the array of movies
    for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("gif-button btn btn-success");
      // Added a data-attribute
      a.attr("data-name", animals[i]);
      // Provided the initial button text
      a.text(animals[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);

    }
}

function addgif(){
    var newGif = $("#user-input").val().trim();
    animals.push(newGif);
    renderButtons();
}

  // Calling the renderButtons function to display the intial buttons
$( document ).ready(function() {
    renderButtons();

    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        addgif();
    });

    $("#buttons-view").on("click", ".gif-button", function() {
        //This gets the data-person attribute!
        var param = $(this).attr("data-name");
        //Then embed in URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
           param + "&api_key="+key+"&limit=10";
        console.log(queryURL);
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
              gifDiv.addClass("gifDiv");
  
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              var animalImage = $("<img class = gif>");
              animalImage.attr("data-animate", results[i].images.fixed_height.url)
              animalImage.attr("data-still", results[i].images.fixed_height_still.url)
              animalImage.attr("data-state","still");
              animalImage.attr("src", results[i].images.fixed_height_still.url);
  
              gifDiv.prepend(animalImage);
              gifDiv.prepend(p);
              
              $("#gif-view").prepend(gifDiv);
            }
          });
      });

      $("#gif-view").on("click", ".gif", function() {
          console.log("clicked");
        var state = $(this).attr("data-state");
        console.log($(this));
        if(state == 'still'){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else if(state == 'animate'){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      })
        
});
 





//var url = "https://api.giphy.com/v1/gifs/search?api_key=blKnNd217LJCoURwnxs6sk1pazj1sLoY&q=Aaron Rodgers&limit=25&offset=0&rating=G&lang=en";