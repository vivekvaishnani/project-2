$(document).ready(function () {
  //Create a variable for the CarQuery object.  You can call it whatever you like.
  var carquery = new CarQuery();

  //Run the carquery init function to get things started:
  carquery.init();

  //Optional: Pass sold_in_us:true to the setFilters method to show only US models. 
  carquery.setFilters({ sold_in_us: true });

  //Optional: initialize the year, make, model, and trim drop downs by providing their element IDs
  carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

  //Optional: set the onclick event for a button to show car data.
  $('#cq-show-data').click(function () { carquery.populateCarData('car-model-data'); });

  //Optional: initialize the make, model, trim lists by providing their element IDs.
  carquery.initMakeModelTrimList('make-list', 'model-list', 'trim-list', 'trim-data-list');

  //Optional: set minimum and/or maximum year options.
  carquery.year_select_min = 1980;
  carquery.year_select_max = "present";
});
 var serviceCost = parseInt(0);
// $("#cq-show-data").on("click", function (event) {
//   // It helps to prevent from submitting traditional method of form 
//   event.preventDefault();
//   var userCarInfo = {
//     year: $("#car-years").val().trim(),
//     make: $("#car-makes").val().trim(),
//     model: $("#car-models").val().trim(),
//     trim: $("#car-model-trims option:selected").text()
//   }

//   var userInfo = {
//     firstName: $("#userFirstName").val().trim(),
//     lastName: $("#userLastName").val().trim(),
//     email: $("#userEmail").val().trim()
//   }

//   console.log(userInfo);
//   submitUserCar(userCarInfo);
//   submitUserInfo(userInfo);

// });

// function submitUserCar(userCarInfo) {
//   $.post("/api/userCarInfo", userCarInfo, function(data) {
//     // window.location.href = "/";
//     console.log(data);
//   });
// }
// function submitUserInfo(userInfo) {
//   $.post("/api/userInfo", userInfo, function(data) {
//     console.log(data);
//   });
// }
$("#userCarData").on("click", function (event) {
  // It helps to prevent from submitting traditional method of form 
  event.preventDefault();
  var userCarInfo = {
    year: $("#car-years").val().trim(),
    make: $("#car-makes").val().trim(),
    model: $("#car-models").val().trim(),
    trim: $("#car-model-trims option:selected").text()
  }
  console.log(userCarInfo.make);
  // submitUserCar(userCarInfo);
  servicesInfo(userCarInfo.make);
});


$(document).on("click", "#confirmServiceButton", function () {
  event.preventDefault();
  var totalPrice = 0;
  $('input:checkbox[name=serviceList]').each(function () {

    if ($(this).is(':checked'))
      totalPrice += parseInt($(this).val());
  });
  $("#totalCost").text(totalPrice);
  serviceCost=totalPrice;
  console.log(totalPrice);
  // alert("Total Cost is : $"+totalPrice);
});

$(document).on("click", "#confirm", function () {
  event.preventDefault();
  submitUserCar();

  var userAppointmentInfo = {
    date: $("#date-info").val().trim(),
    address: $("#address-info").val().trim(),
    city: $("#city-info").val().trim(),
    state: $("#state-info").val().trim(),
    phoneNumber: $("#phone-info").val().trim()
    
  }
  console.log(userAppointmentInfo);
  function submitUserCar(userAppointmentInfo) {

    $.post("/api/userCarInfo", userAppointmentInfo, function () {

    });
  };
});

function servicesInfo(make) {

  // Ajax call for services is happenning over here 
  $.get("/api/services/" + make, function (data) {
    console.log(data[0]);
    $("#serviceMake").text(data[0].car_make);
    var brake_price = parseInt(data[0].brake_price);
    $('#serviceTable').append('<input type="checkbox" class="serviceList" name="serviceList" value="' + brake_price + '"> Break Service: $<span id="brakePrice">' + brake_price + '</span><br>');

    var oil_price = parseInt(data[0].oil_price);
    $('#serviceTable').append('<input type="checkbox" class="serviceList" name="serviceList" value="' + oil_price + '"> Oil Service: $<span id="oilPrice">' + oil_price + '</span><br>');

    var tire_rotation_price = parseInt(data[0].tire_rotation_price);
    $('#serviceTable').append('<input type="checkbox" class="serviceList" name="serviceList" value="' + tire_rotation_price + '"> tire_rotation Service: $<span id="tire_rotationPrice">' + tire_rotation_price + '</span><br>');


    var transmission_price = parseInt(data[0].transmission_price);
    $('#serviceTable').append('<input type="checkbox" class="serviceList" name="serviceList" value="' + transmission_price + '"> Transmission Service: $<span id="transmissionPrice">' + transmission_price + '</span><br>');

    var gasket_price = parseInt(data[0].gasket_price);
    $('#serviceTable').append('<input type="checkbox" class="serviceList" name="serviceList" value="' + gasket_price + '"> Valve Gasket Replacement: $<span id="gasketPrice">' + gasket_price + '</span><br>');

    $('#serviceTable').append('<button id="confirmServiceButton" type = "submit"  class="btn btn-primary">Confirm Services</button> <br> <br>');
    $('#serviceTable').append('<h3>Total Cost is $: <span id ="totalCost"></span> </h3>')
  });

}





