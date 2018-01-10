var config = {
    apiKey: "AIzaSyDGQe1WpVMCWdCTnGLSKSrrX3t6wyydSlw",
    authDomain: "muber-2e3f5.firebaseapp.com",
    databaseURL: "https://muber-2e3f5.firebaseio.com",
    projectId: "muber-2e3f5",
    storageBucket: "muber-2e3f5.appspot.com",
    messagingSenderId: "1043531724253"
  };
  firebase.initializeApp(config);

function previewImage() {
  var storage = firebase.storage();
  var file = document.getElementById("files").files[0];
  console.log("Code MADE IT");
  var storageRef = storage.ref();
  var thisRef = storageRef.child(file.name);
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });

  thisRef.getDownloadURL().then(function(url) {
    console.log(url);
  })
};

$(document).ready(function() {
        
  var database = firebase.database();
  var custName = "";
  var moveFrom = "";
  var moveTo = "";
  var moveDate = "";
  var movePrice = "";
  var moveItem = "";
  var postingDate = "";
  var acceptStatus;
  var moverAccepted;

  var address;
  var replaced_address;
  var replaced_address2;
  var map;
  var marker;
  var locJS;
  var locJS_matrix = [];
  var locJS2;
  var FormValidation = false;

  var postingDate= moment().format('MMMM Do YYYY');
  $('#form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });

    $('#Submit').on("click", function(event) {
            event.preventDefault();
            console.log("abc");
            validate();
            //previewImage();
            console.log("form valid:" + FormValidation);
            if(FormValidation)
            {
            custName = $('#requesterName').val().trim();
            moveFrom = $('#moveFrom').val().trim();
            moveTo = $('#moveTo').val().trim();
            moveDate = $('#moveDate').val().trim();
            movePrice = $('#movePrice').val().trim();
            postingDate= moment().format('MMMM Do YYYY, h:mm a');
            moveItem = $('#moveItem').val().trim();
           

                    database.ref().push({
                        custName: custName,
                        moveFrom: moveFrom,
                        moveTo: moveTo,
                        moveDate: moveDate,
                        movePrice: movePrice,
                        postingDate: postingDate,
                        moveItem: moveItem,
                        acceptStatus:false

            });
          }
                    
    });
       
    database.ref().on("child_added", function(childSnapshot){
        var tableRow = $('<tr>');
        
      

        custName = childSnapshot.val().custName;
        moveFrom = childSnapshot.val().moveFrom;
        moveTo = childSnapshot.val().moveTo;
        moveDate = childSnapshot.val().moveDate;
        movePrice = childSnapshot.val().movePrice;
        postingDate = childSnapshot.val().postingDate;
        moveItem = childSnapshot.val().moveItem;
        acceptStatus = childSnapshot.val().acceptStatus;

        if (acceptStatus){
              moverAccepted = "<button>Mover accepted</button>";
            } else {
              moverAccepted = "<button>No Response</button>";
            }
        

        var tableCols= $('<td>' + custName + '</td>' + '<td>' + moveFrom + '</td>' + '<td>' + moveTo + '</td>' + '<td>' + moveDate + '</td>' + '<td>' +  movePrice +  '</td>' +'<td>' + moverAccepted +  '</td>');
        var tableBody = $('.tableBody');
        tableRow.append(tableCols);
        tableBody.append(tableRow);

        

       
        replaced_address = moveFrom.replace(/ /g,"+");
        replaced_address2 = moveTo.replace(/ /g,"+");

        
        console.log("replaced_address: ", replaced_address);
        console.log("replaced_address2: ", replaced_address2);



        queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + replaced_address + "&key=AIzaSyAmTACE9kBFL5oaaEsSy_eMxEVpLtN5p3A";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

        .done(function(response) {

                  locJS= response.results[0].geometry.location; 
                  locJS_matrix.push(locJS);
                  initMap(locJS);
            });


        queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + replaced_address2 + "&key=AIzaSyAmTACE9kBFL5oaaEsSy_eMxEVpLtN5p3A";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

        .done(function(response) {

                  locJS2= response.results[0].geometry.location; 
                  locJS_matrix.push(locJS2);
                  console.log("locJS_matrix: ", locJS_matrix);
            });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer; 
        calculateAndDisplayRoute(directionsService, directionsDisplay);

 
    });

    function autocomplete() {
      var moveFrom = document.getElementById('moveFrom');
      var moveTo = document.getElementById('moveTo');

      var autocomplete = new google.maps.places.Autocomplete(moveFrom);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

      var autocomplete = new google.maps.places.Autocomplete(moveTo);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);
    }
    function validate() {
      console.log("dcb");
      var requesterName = $('#requesterName').val().trim();
      var moveDate = $('#moveDate').val().trim();
      var movePrice = $('#movePrice').val().trim();
      var moveItem = $('#moveItem').val().trim();

      var requesterNameRegex = /^(([A-Za-z]+)(\s[A-Za-z]+)?)$/gm;
      var moveDateRegex = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2]))\/(?:(?:1[6-9]|[2-9]\d)\d{2}))$|^(?:(?:(?:31\/0?[13578]|1[02])|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])))\/(?:(?:1[6-9]|[2-9]\d)\d{2}))$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$/;
      var movePriceRegex = /(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/;
      var moveItemRegex = /[^{}]+(?![\d}])/g;


    if (!requesterNameRegex.test(requesterName)) {
      $('#errorRequesterName').text("A name is required");
        FormValidation = false;
        } else {
        FormValidation = true;
        $('#errorRequesterName').text("");
      }

    if (!moveDateRegex.test(moveDate)) {
        $('#errorMoveDate').text("A date is required");
         FormValidation = false;
         } else {
          FormValidation = true;
          $('#errorMoveDate').text("");
        }

    if (!movePriceRegex.test(movePrice)) {
      $('#errorMovePrice').text("Valid Price is required");
        FormValidation = false;
         } else {
          FormValidation = true;
        $('#errorMovePrice').text("");
      }
    
    if (!moveItemRegex.test(moveItem)) {
      $('#errorMoveItem').text("Description is required");
        FormValidation = false;
         } else {
          FormValidation = true;
        $('#errorMoveItem').text("");
      }

       $('input').change(function() {
          $('.error').hide();
          console.log("inputchange");
        });

      return FormValidation;
    };

    

    $('#clearAll').on("click", function(event) {
        event.preventDefault();
            $('#requesterName').val("");
            $('#moveFrom').val("");
            $('#moveTo').val("");
            $('#moveDate').val("");
            $('#movePrice').val("");
            $('#moveItem').val("");

            $('#errorRequesterName').text("");
            $('#errorMoveDate').text("");
            $('#errorMovePrice').text("");
            $('#errorMoveItem').text("");
    });
      
      function initMap(coords) {
        
          map = new google.maps.Map(document.getElementById("map"), {
          zoom: 8,
          center: coords
        });
          autocomplete();
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: replaced_address,
          destination: replaced_address2,
          travelMode: 'DRIVING'
        }, function(response, status) {
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
    });