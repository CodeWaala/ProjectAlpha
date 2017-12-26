// function initMap() {
//     var uluru = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: uluru
//     });
//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
//   }

  
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

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
            center: {lat: -34.397, lng: 150.644}
          });
          var geocoder = new google.maps.Geocoder();
  
          document.getElementById('submit').addEventListener('click', function() {
            geocodeAddress(geocoder, map);
          });
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

        
    
 



            // This example displays a marker at the center of Australia.
      // When the user clicks the marker, an info window opens.

     
        