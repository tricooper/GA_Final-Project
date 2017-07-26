// initialize slick

'use strict'

$(function () {
  $("#datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
  }).datepicker('update', new Date());;
});
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




// compile HTML/Handlebars function
var compileHtml = function (flightsHtml, templateId) {
  var flightTemplate = $(templateId).html();
  var flightScript = Handlebars.compile(flightTemplate);
  return flightScript(flightsHtml);

}



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
    $('#originAutocomplete').append('<option value="' + airportCode +'">' + airportName + ' (' + airportCode + ") , " + airportCountry + '</option>');
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
    $('#destinationAutocomplete').append('<option value="' + airportCode +'">' + airportName + ' (' + airportCode + ") , " + airportCountry + '</option>');
    }
 
}



// search for flights using Google flights

 $('body').on('click', '#fly-button', function(){
  $('#flight-info').siblings().remove();
  $('#flight-header').children().remove();
  $('#fly-button').text('loading flights!');
  $('#flight-error').hide();
  var originInputValue = $('#origin').val();
  var destinationInputValue = $('#destination').val();
  var dateInputValue = yearMonthDay($('#datepicker').val());
  console.log(dateInputValue);
  var request = $.ajax({
    url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCd4YKgMx8GYZF5gzytSY1R7y2e8F0o4FM',
    type: "POST",
    data: JSON.stringify({
     "request": {
       "slice": [
        {
          "origin": originInputValue,
          "destination": destinationInputValue,
          "date": dateInputValue
        }
      ],
        "passengers": {
        "adultCount": 1,
        "infantInLapCount": 0,
        "infantInSeatCount": 0,
        "childCount": 0,
        "seniorCount": 0
      },
      "solutions": 15,
      "refundable": false
    }
  }),
  contentType: 'application/json',
  success: appendFlights,
  error: errorFunction
  });

 });

 var appendFlights = function(data) {
    $('#fly-button').text("Let's Fly!");

    // flight-header
    var origin = $('#origin').val();
    var destination = $('#destination').val();
    var date = MonthDayYear($('#datepicker').val());
    var flightHeaderObj = {
      origin: origin, 
      destination: destination,
      date: date
    };
    var flightHeaderHtml = compileHtml(flightHeaderObj, '#flights-header');
    $('#flight-header').append(flightHeaderHtml);

    for (var i = 0; i < 15; i ++) {
      var flightData = data.trips.tripOption[i];
      var price = flightData.saleTotal;
      var priceString = price.substring(3);
      var depart = flightData.slice[0].segment[0].leg[0].departureTime;
      var arrive = flightData.slice[0].segment[0].leg[0].arrivalTime;
      var departureTime = changeDate(depart);
      var arrivalTime = changeDate(arrive);
      var flightObj = {
        price: priceString,
        airlineCode: flightData.slice[0].segment[0].flight.carrier,
        departureTime: departureTime,
        arrivalTime: arrivalTime
      };
      var flightHtml = compileHtml(flightObj, '#flights-template');
      // if element is divisible, then add 3 column grid
      if ((i % 3) === 0) {
        $('.l-wrap').append('<div class="three-col-grid"></div>')
      }
      
      // append element to flight-info + 1
      $('.three-col-grid').last().append(flightHtml);
    }


 }

 var errorFunction = function() {
  $('#fly-button').text("Let's Fly!");
  $('#flight-error').show();
 }

// change date format function

var changeDate = function(date) {
var mydate = new Date(date);
var str = mydate.toString("MMMM dd, yyyy hh:mm tt");
return(str);
  }

var MonthDayYear = function(date) {
var mydate = new Date(date);
var str = mydate.toString("MMMM dd, yyyy");
return(str);
  }

var yearMonthDay = function(date) {
  var mydate = new Date(date);
  var str = mydate.toString("yyyy-MM-dd");
  return(str);
}








