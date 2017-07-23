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

  //   $('#fly-button').on('click', function() {
  //   var destination = $('#destination').val();
  //   $('#destination').val('');
  //   console.log(destination);
  //    var request = $.ajax({
  //     url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + destination + '&key=AIzaSyDu3gjh4psHcCnMHJYhew2EebBb3I_jdAQ',
  //     success: appendDestination
       
  //    }); 
  //  });

  //   function appendDestination (data) {
  //   var latitude = data.results[0].geometry.bounds.northeast.lat;
  //   var longitude = data.results[0].geometry.bounds.northeast.lng;
  //   console.log(latitude);
  //   console.log(longitude);
  //   $('.geolocation').html('');
  //   $('.geolocation').append('<div>'+ latitude +'</div>' + longitude);

  // } 


// on Keyup search for a location

$('#origin').on('keyup', function(){
  var query = $('#origin').val();
  if (query.length > 1) {
  originAutocomplete(query);
  
}
});

$('#destination').on('keyup', function(){
  var query = $('#destination').val();
  
  if (query.length > 1) {
  destinationAutocomplete(query);
}
});




var originAutocomplete = function (query) {
  var request = $.ajax({
    url:  'https://iatacodes.org/api/v6/autocomplete.jsonp?query=' + query + '&api_key=beb637d9-aeed-4a1f-9dbc-4a98218fa7c8&callback=appendOrigin',   
    jsonp: "$jsonp",
    dataType: "jsonp",
    Origin: 'https://fast-tor-62636.herokuapp.com',
    success: appendOrigin
  });

}

var appendOrigin = function(data) {
  
  $('#originAutocomplete').html('');
  var airports = data.response.airports;
  //loop over array
  for (var i = 0; i < airports.length; i ++ ) {
    var airportCode = airports[i].code;
    var airportCountry = airports[i].country_name;
    var airportName = airports[i].name;
    $('#originAutocomplete').append('<option>' + airportName + ' (' + airportCode + ") , " + airportCountry + '</option>');
    }
 
}

var destinationAutocomplete = function (query) {
  var request = $.ajax({
    url:  'https://iatacodes.org/api/v6/autocomplete.jsonp?query=' + query + '&api_key=beb637d9-aeed-4a1f-9dbc-4a98218fa7c8&callback=appendDestination',   
    jsonp: "$jsonp",
    dataType: "jsonp",
    Origin: 'https://fast-tor-62636.herokuapp.com',
    success: appendDestination
  });

}

var appendDestination = function(data) {
  $('#destinationAutocomplete').html('');
  var airports = data.response.airports;
  //loop over array
  for (var i = 0; i < airports.length; i ++ ) {
    var airportCode = airports[i].code;
    var airportCountry = airports[i].country_name;
    var airportName = airports[i].name;
    $('#destinationAutocomplete').append('<option>' + airportName + ' (' + airportCode + ") , " + airportCountry + '</option>');
    }
 
}

// search for flights using Google flights



