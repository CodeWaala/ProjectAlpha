(function ($) {
  $(function () {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
  $('.button-collapse').sideNav();

})

$('.no-touch .project-list li:nth-child(3), .no-touch .project-list li:nth-child(8)').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(1)').toggleClass('show-image');
});

$('.no-touch .project-list li:nth-child(4), .no-touch .project-list li:nth-child(9)').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(2)').toggleClass('show-image');
});

$('.no-touch .project-list li:nth-child(5), .no-touch .project-list li:nth-child(9)').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(3)').toggleClass('show-image');
});

$('.no-touch .project-list li:nth-child(6), .no-touch .project-list li:nth-child(10)').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(4)').toggleClass('show-image');
});

$('.no-touch .project-list li:nth-child(7), .no-touch .project-list li:nth-child(11)').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(5)').toggleClass('show-image');
});

// Reset 
$('.touch .client-wrap').click(function (event) {
  var target = $(event.target);
  if (target.hasClass("client-close")) {
    $('.client-wrap div.client').addClass('reset');
  }
  else {
    $('.client-wrap div.client').removeClass('reset');
  }
});

// White BG for client top
$('.no-touch .project-list li').hover(function (e) {
  $(this).parents('.client-meta').next('.overflow-wrapper').toggleClass('white-bg');
  $('.touch .client-wrap').toggleClass('.solid');
});

[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function () {
    img.removeAttribute('data-src');
  };
});


$(document).ready(function () {
  $('.button-collapse').sideNav();

  $(document).on("mouseover", ".card", cardHovered);
  $(document).on("mouseout", ".card", cardOut);
  $(document).on("click", ".accept-button", acceptClicked);
})

var map, infoWindow, database;
var MarkersInfo = {};
var IconUrl = "images/GRAY-PIN.png";
var IconUrlHover = "images/red-pin.png";

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 32.715, lng: -117.161 }
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
  database = firebase.database();

  database.ref().on("child_added", function (childSnapshot) {

    //console.log("childSnapshot", childSnapshot);
    var key = childSnapshot.key;
    custName = childSnapshot.val().custName;
    moveFrom = childSnapshot.val().moveFrom;
    moveTo = childSnapshot.val().moveTo;
    moveDate = childSnapshot.val().moveDate;
    movePrice = childSnapshot.val().movePrice;
    $(".movePrice").css('color', '#FF000');
    postingDate = childSnapshot.val().postingDate;
    moveItem = childSnapshot.val().moveItem;
    acceptStatus = childSnapshot.val().acceptStatus;

    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map, moveFrom, movePrice,key);
    //console.log(map);

    var divContainer = $('<div class="card customer-card" data-acceptStatus= "' + acceptStatus + '" data-key="' + key + '" data-movefrom="' + moveFrom + '">')
    var divInner = $(`
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="http://arkleus.com/i/2017/10/small-sectional-sofa-modern-leather-sofa-leather-chesterfield-sofa-blue-leather-sofa--970x647.jpg">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${custName}<div class = "move-price"> ${movePrice}</div><i class="material-icons right">more_vert</i></span>
                <p><a href="#"><button class="btn waves-effect waves-light accept-button" ${acceptStatus ? 'disabled' : ""} type="submit" name="action">Accept
                <i class="material-icons right">send</i>
              </button></a></p>
              </div>
              <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${custName}</p><i class="material-icons right">close</i></span>
                <p class = "move-price"> ${movePrice}</p>
                <div class = "description">Start:</div> ${moveFrom}
                <div class = "description">End: </div> ${moveTo}
                <div class = "description">Description: </div>${moveItem}
              </div>
          </div>
          `);

    
    divContainer.append(divInner);
    $('.flex-1').append(divContainer);
    //$('.accept-button').attr("disabled", acceptStatus);
  });
  
}

function cardHovered() {
  //alert($(this).attr("data-movefrom"));
  MouseOver($(this).attr("data-key"));
  //change the marker image based on the address
}

function cardOut() {
  MouseOut($(this).attr("data-key"));
}


function acceptClicked() {
   var key = $(this).closest('.card').attr("data-key");
   var Status = $(this).closest('.card').attr("data-acceptStatus");
   var data = database.ref().orderByChild('key').equalTo(key);
   //console.log(Status);
  //alert("clicked");
  console.log(key);
     database.ref(key).update({
     acceptStatus:true
   })

   $(this).attr("disabled", acceptStatus);
}

function geocodeAddress(geocoder, resultsMap, moveFrom, price,key) {
  var address = moveFrom;//.replace(/ /g,"+");
  //console.log(address);
  //console.log(resultsMap);
  geocoder.geocode({ 'address': address }, function (results, status) {
    //console.log(results);
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      setInfoWindow(resultsMap, results, price,key);
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

function setInfoWindow(map, results, price, key) {
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  //console.log(results[0]);
  service.getDetails({
    placeId: results[0].place_id
  }, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        Icon: IconUrl,
        key:key
      });
      //MarkersInfo.push({marker:marker, key:key});
      MarkersInfo[key] = marker;
      console.log(MarkersInfo);
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div><strong>' + price + '</strong><br>' +
          'Location Type: ' + place.types[0] + '<br>' +
          place.formatted_address + '</div>');
          infowindow.open(map, this);
          marker.setIcon({
            url:IconUrlHover
          })
      });

      google.maps.event.addListener(infowindow, 'closeclick', function() {
        marker.setIcon({
            url:IconUrl
          })
      });

      google.maps.event.addListener(marker, 'mouseover', function(e) {
          //ToDO: on mouseover link the left tile with marker
          // $('.customer-card[data-key=' +  key + ']').css("opacity", "0.5");
          console.log(e);
      });
      google.maps.event.addListener(marker, 'mouseout', function() {
           
           //ToDO: change marker and remove the link to left tile
          //  marker.setIcon({
          //   url:IconUrl
          // })
      });
    }
  });
}

function MouseOver(key) {
   MarkersInfo[key].setIcon({
            url: IconUrlHover
   });
  //  for(var i = 0; i < MarkersInfo.length; i++)
  //  {
  //    console.log(MarkersInfo);
  //    if(MarkersInfo.key == key)
  //    {
  //      //alert("true");
  //      MarkersInfo.setIcon({
  //           url: IconUrlHover
  //      })
  //    }
  //  }
}

function MouseOut(key) {
  MarkersInfo[key].setIcon({
            url: IconUrl
   });
//  for(var i = 0; i < MarkersInfo.length; i++)
//    {
//      if(MarkersInfo[i].key == key)
//      {
//        //alert("true");
//        MarkersInfo[i].marker.setIcon({
//             url: IconUrl
//        })
//      }
//    }
}



