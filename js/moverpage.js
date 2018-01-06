(function($){
    $(function(){
          $('.button-collapse').sideNav();
          $('.parallax').parallax();
      
        }); // end of document ready
      })(jQuery); // end of jQuery name space
      
      $( document ).ready(function(){
        $('.button-collapse').sideNav();
        
      })   

      $('.no-touch .project-list li:nth-child(3), .no-touch .project-list li:nth-child(8)').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(1)').toggleClass('show-image');
      });
      
      $('.no-touch .project-list li:nth-child(4), .no-touch .project-list li:nth-child(9)').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(2)').toggleClass('show-image');
      });
      
      $('.no-touch .project-list li:nth-child(5), .no-touch .project-list li:nth-child(9)').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(3)').toggleClass('show-image');
      });
      
      $('.no-touch .project-list li:nth-child(6), .no-touch .project-list li:nth-child(10)').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(4)').toggleClass('show-image');
      });
      
      $('.no-touch .project-list li:nth-child(7), .no-touch .project-list li:nth-child(11)').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').find('img:nth-child(5)').toggleClass('show-image');
      });
      
      // Reset 
      $('.touch .client-wrap').click(function(event){
          var target = $( event.target );
          if ( target.hasClass( "client-close" ) ) {
            $('.client-wrap div.client').addClass('reset');
          }
          else{
            $('.client-wrap div.client').removeClass('reset');
          }
      });
      
      // White BG for client top
      $('.no-touch .project-list li').hover(function(e) {
        $(this).parents('.client-meta').next('.overflow-wrapper').toggleClass('white-bg');
        $('.touch .client-wrap').toggleClass('.solid');
      });
      
      [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
          img.removeAttribute('data-src');
        };
      });
      

      
      
var map, infoWindow;


function initMap() {
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
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
            $(".movePrice").css('color', '#FF000');
            postingDate = childSnapshot.val().postingDate;
            moveItem = childSnapshot.val().moveItem;
            bidStatus = childSnapshot.val().bidStatus;

            var geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map, moveFrom);
            console.log(map);

            var divContainer = $('<div class="card customer-card">')
            var divInner = $(`
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="http://www.mymydiy.com/wp-content/uploads/2017/10/sofa.png">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${custName}<div class = "move-price"> ${movePrice}</div><i class="material-icons right">more_vert</i></span>
                <p><a href="#"><button class="btn waves-effect waves-light accept-button" type="submit" name="action">Accept
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

          

            // var divContainer = $('<div class= "client">');

            // var divInner = $(`
            //   <div class="client-more-less"></div>
            //   <div class="client-meta">
            //     <div class="client-close"></div>
            //     <ul class="project-list">
                  
            //       <h4 class="client-title">${custName}</h4>
            //       <li>Price: ${movePrice}</li>
            //       <li>${moveDate}</li>
            //       <li>${moveItem}</li>
            //       <li>Start: ${moveFrom}</li>
            //       <li>End: ${moveTo}</li>
            //       <button type ="button" class= "button-accept>accept</button>
            //     </ul>
            //   </div>
            //   <div class="overflow-wrapper">
            //   </div>
            //     ${custName}
            //   </div>  
            // `)

            // var divContainer = $('<div class=" card [ is-collapsed ] ">');
            // var divInner = $(`
              
              
              
            //   <div class="card__inner [ js-expander ]">
            //     <span>${custName}</span>
            //    <i class="fa fa-folder-o"></i>  
            //   </div>
            //   <div class="card__expander">
            //     <i class="fa fa-close [ js-collapser ]"></i>
            //     ${moveItem}
            //   </div>
            //   </div>
            //   </div>
              
            // `);
        
      

            // var divContainer = $('<div class= "card">');
            // var divInner = $(`
            //   <div class="card-content">
            //     <p>${custName}</p>  
            //     <p>${moveItem}</p>
            //     <p>${movePrice}</p>
            //   </div>
            //   <div class="card-tabs">
            //     <ul class="tabs tabs-fixed-width">
            //       <li class="tab"><a href="#test4">Start</a></li>
            //       <li class="tab"><a class="active" href="#test5">End</a></li>
            //       <li class="tab"><a href="#test6">Date</a></li>
            //     </ul>
            //   </div>
            //   <div class="card-content grey lighten-4">
            //     <div id="test4">${moveFrom}</div>
            //     <div id="test5">${moveTo}</div>
            //     <div id="test6">${moveDate}</div>
            //   </div>
            // </div>`)
              
                // <hr class="bar">              
          //   <div class="card-tabs">
          //   <ul class="tabs tabs-fixed-width">
          //     <li class="tab"><a href="#test4">Start Address</a></li>
          //     <li class="tab"><a href="#test5">End Address</a></li>
          //     <li class="tab"><a href="#test6">Date</a></li></ul>
          //     <div class="card-content grey lighten-4">
                  
          //         <div id="test5"> ${moveTo}</div>
          //         <div id="test4"> ${moveFrom}</div>
          //         <div id="test6"> ${moveDate}</div>
          //       </div>
          // </div>
                
           
                

          //   <div class="card-content grey lighten-4">
                  
          //         <div id="test5"> ${moveTo}</div>
          //         <div id="test4"> ${moveFrom}</div>
          //         <div id="test6"> ${moveDate}</div>
          //       </div>

            // <div id="test4"> ${moveFrom}</div>
            // <div id="test6"> ${moveDate}</div>
            //   '<div class="card-content">Customer Name: ' + custName + '<p>Item: ' + moveItem + '</p>' + '<p> Price: ' + movePrice + '</div>'
            // + '<div class="card-tabs">' + '<ul class="tabs tabs-fixed-width">' 
            // + '<li class="tab"><a href="#test4" class="active">Start Address</a></li>' + '<li class="tab"><a href="#test5">End Address</a></li>'  + '<li class="tab"><a href="#test6">Date</a></li>'
            // + '</ul>'
            // + '</div>'
            // + '<div class="card-content grey lighten-4">' 
            // + '<div id="test4">' + moveFrom + '</div>'
            // + '<div id="test5">' + moveTo + '</div>' 
            // + '<div id="test6">'+ postingDate + '</div>'
            // + '</div>'
            // + '</div>');

            divContainer.append(divInner);
            $('.flex-1').append(divContainer);
      });

  

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
  }}
