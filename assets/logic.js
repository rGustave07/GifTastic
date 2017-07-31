
var topics = ["coding"];
topics = JSON.parse(localStorage.getItem('save')) || [];

function renderBtns(){
  $('#gifBoxHolder').empty();
  $('#searchButton').val("Let's Go!");
  $('#addGif').text("");
  for ( var i = 0; i < topics.length; i++ ){
    $('#gifBoxHolder').append("<button>" + topics[i] + "</button>");
  }
};

// function saveButtons(currentArr){
//   localStorage.setItem('save', JSON.stringify(currentArr));
//   saveArr = JSON.parse(localStorage.getItem('save'));
// };

// Ajax Call
$('#gifBoxHolder').on('click', function(event) {
  $('#actualGifHolder').empty();
  var usrInput = event.target.innerText;
  console.log(usrInput);
  var APIkey = "4dfb1a6af4d34ebd9f3ee0eada34cc34";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=";

  $.ajax({
    url: queryURL + usrInput + "&api_key=" + APIkey + "&limit=25",
    method: "GET"
  }).done( function(response){
    var gifsArr = response.data;
    console.log(gifsArr);

    for ( var i = 0; i < gifsArr.length; i++){
      var newGif = gifsArr[i].images.downsized;
      console.log(newGif);
      // $("#actualGifHolder").append('<img height='+newGif.height+ 'width=' + newGif.width + ' src=' + newGif.url +'>');
      $("#actualGifHolder").append('<img height= 200px; '+ 'width=200px' + ' src=' + newGif.url +'>');
    };
  });
});

$('#searchButton').on('click', function(){
  event.preventDefault();
  $('#gifBoxHolder').empty();
  topics.push($('#addGif').val());
  localStorage.setItem('save', JSON.stringify(topics));
  renderBtns();
  $('#addGif').val("");
});

renderBtns();
