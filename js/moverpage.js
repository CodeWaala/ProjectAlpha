(function($){
    $(function(){
          $('.button-collapse').sideNav();
          $('.parallax').parallax();
      
        }); // end of document ready
      })(jQuery); // end of jQuery name space
      
      $( document ).ready(function(){
        $('.button-collapse').sideNav();
        
      })   
      
var map, infoWindow;


function initMap() {
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 32.715, lng: -117.161}
          });
          
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map.setCenter(pos);
            }, function () {
              handleLocationError(true, infoWindow, map.getCenter());
            });

          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());

          }

    
          var geocoder = new google.maps.Geocoder();
          getActiveRequests(map);
    //       //document.getElementById('submit').addEventListener('click', function() {
    //       geocodeAddress(geocoder, map);
    // });
}
  
function geocodeAddress(geocoder, resultsMap) {
          var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
    });
}


function getActiveRequests(map) {

   var config = {
    apiKey: "AIzaSyDGQe1WpVMCWdCTnGLSKSrrX3t6wyydSlw",
    authDomain: "muber-2e3f5.firebaseapp.com",
    databaseURL: "https://muber-2e3f5.firebaseio.com",
    projectId: "muber-2e3f5",
    storageBucket: "muber-2e3f5.appspot.com",
    messagingSenderId: "1043531724253"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

   database.ref().on("child_added", function (childSnapshot) {

            //console.log("childSnapshot", childSnapshot);
            custName = childSnapshot.val().custName;
            moveFrom = childSnapshot.val().moveFrom;
            moveTo = childSnapshot.val().moveTo;
            moveDate = childSnapshot.val().moveDate;
            movePrice = childSnapshot.val().movePrice;
            postingDate = childSnapshot.val().postingDate;
            moveItem = childSnapshot.val().moveItem;
            bidStatus = childSnapshot.val().bidStatus;

            var geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map, moveFrom);
            console.log(map);
            var divContainer = $('<div class="card">');

            var divInner = $('<div class="card-content">Customer Name:' + custName + '<p>Item: ' + moveItem + '</p>' + '<p> Price: ' + movePrice + '</div>'
            // + '<div class="card-tabs">' + '<ul class="tabs tabs-fixed-width">' 
            // + '<li class="tab"><a href="#test4" class="active">Start Address</a></li>' + '<li class="tab"><a href="#test5">End Address</a></li>'  + '<li class="tab"><a href="#test6">Date</a></li>'
            // + '</ul>'
            // + '</div>'
            // + '<div class="card-content grey lighten-4">' 
            // + '<div id="test4">' + moveFrom + '</div>'
            // + '<div id="test5">' + moveTo + '</div>' 
            // + '<div id="test6">'+ postingDate + '</div>'
            // + '</div>'
            + '</div>');

            divContainer.append(divInner);
            $('.activeRequests').append(divContainer);
      });

}

function geocodeAddress(geocoder, resultsMap, moveFrom) {
          var address = moveFrom;//.replace(/ /g,"+");
          //console.log(address);
          //console.log(resultsMap);
          geocoder.geocode({'address': address}, function(results, status) {
            console.log(results);
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {

  directionsService.route({
    origin: replaced_address, //document.getElementById('start').value,
    destination: replaced_address2,  //document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      new google.maps.DirectionsRenderer({
        map: map,
        directions: response
      });
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

}