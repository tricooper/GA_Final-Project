// initialize slick

    $(document).ready(function(){
      $('.slick-container').slick({
        autoplay: true,
        //centerMode: true,
        centerPadding: '20px',
        infinite: true,
        slidesToShow: 3,
        
        arrows: false,
          responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
        }
        }
      ]
      });
    });


// search based on input for lat/long

    $('#fly-button').on('click', function() {
    var destination = $('#destination').val();
    $('#destination').val('');
    console.log(destination);
     var request = $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + destination + '&key=AIzaSyDu3gjh4psHcCnMHJYhew2EebBb3I_jdAQ',
      success: appendDestination
       
     }); 
   });

    function appendDestination (data) {
    var latitude = data.results[0].geometry.bounds.northeast.lat;
    var longitude = data.results[0].geometry.bounds.northeast.lng;
    console.log(latitude);
    console.log(longitude);
    $('.geolocation').html('');
    $('.geolocation').append('<div>'+ latitude +'</div>' + longitude);



  } 


// on Keyup search for a location

$('#origin').on('keyup', function(){
  var query = $('#origin').val();
  originAutocomplete(query);
});

var originAutocomplete = function (query) {
  var request = $.ajax({
    url:  'https://iatacodes.org/api/v6/autocomplete?query=' + query + '&api_key=beb637d9-aeed-4a1f-9dbc-4a98218fa7c8',
    contentType: "application/json",
    Origin: 'https://fast-tor-62636.herokuapp.com',
    success: appendAutocomplete
  });

}

var appendAutocomplete = function(data) {
  console.log(data);
}

// search for flights using Google flights



