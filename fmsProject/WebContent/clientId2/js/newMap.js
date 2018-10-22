function initMap() {
    var body = document.body
        , html = document.documentElement;
   var height = $(window).height();
    console.log(height);
  
    document.getElementById('map1').style.height = (height) + 'px';
    $('.dashboard-li').css('height',height);
    $.getJSON('config_Dashboard.json', function (data_local) {
        var mapLocation = {
            lat: data_local.MapLocation.lat
            , lng: data_local.MapLocation.lng
        };
        var arrItems = [];
        var markerImage = data_local.ImageLocations.busStopIcon;
        var src = data_local.KmlFile;
        var zoomCounter = 0;
        var map = new google.maps.Map(document.getElementById('map1'), {
            zoom: data_local.MapZoomLevel
            , center: mapLocation
            , mapTypeId: google.maps.MapTypeId.SATELLITE
            , fullScreenControl: true
            , fullScreenControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
            , zoomControl: false
            , streetViewControl: false
        });
        var geoJsonObject;
        $.ajax(src).done(function (xml) {
            geoJsonObject = (toGeoJSON.kml(xml));

            function polystyle(feature) {
                return {
                    fillColor: 'blue'
                    , weight: 2
                    , opacity: 1
                    , color: 'white', //Outline color
                    fillOpacity: 0.7
                };
            }
            map.data.addGeoJson(geoJsonObject);
        });
        map.data.setStyle({
            strokeColor: '#ffffff'
            , strokeWeight: 5
        });
        $('#zoomButton').on('click', function () {
            map.setZoom(17.7);
        });
        $('.minus').on('click', function () {
            map.setZoom(17);
            zoomCounter = 1;
        });
        var Position;
        var latlng;
        var locationLinks = [];
        var Carmarker = [];
        var position_busStop;
        for (var i = 0; i < data_local.VehicleId.length; i++) {
            var counter = i + 1;
          /*  var olliList = '<li class="list-group-item">' + '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 first-child">' + '<img src="' + data_local.OlliListIcons[i] + '" style="width: 90px;">' + '<a href="#" style="text-decoration: none;">' + '<h2 class="first-column">Olli - ' + counter + '</h2>' + '</a>' + '<h4 class="olli-active activeStatus"></h4>' + '</div>' + '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 padLeft" style="text-align: left;">' + '<div class="battery">' + '<img  class = "dashboard-img-width" src = "images/battery.png">' + ' <h4 style="display: inline" class="color-white bold-icon"  id="batterStatus' + counter + '"></h4>    ' + '</div>' + '<div class="speedometer">' + '<img class = "dashboard-img-width" src = "images/speed.png">' + '<h4  style="display: inline" class="color-white bold-icon" id="speed' + counter + '"></h4>' + '</div>' + '</div>' + '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' + '<a href="#" id="button">' + '<img  class="img-responsive" style="padding-top: 50px; width: 80px" src="images/stop.png"></a>' + '</div>' + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 down-column">' + '<h3 style = "margin-top: 35px;">Next Destination : <span id="destination' + counter + '" class="color-white">N/A</span></h3>' + '<h3 style = "margin-top: 35px;">Passenger Count : <span id="passenger' + counter + '" class="color-white">0</span></h3>' + ' <div class = "col-md-3 pad0"><h3 style = "margin-top: 35px;">A : <span id="adultCount' + counter + '" class="color-white"></span></h3></div><div class = "col-md-3 pad0"><h3 style = "margin-top: 35px;">C : <span id="childCount' + counter + '" class="color-white"></span></h3></div><div class = "col-md-3 pad0"><h3 style = "margin-top: 35px;">W : <span id="wheelCount' + counter + '" class="color-white"></span></h3></div> </div>' + ' </li>';*/
               var olliList = '<li class="list-group-item">' + '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 first-child">' + '<img src="' + data_local.OlliListIcons[i] + '" style="width: 70px;">' + '<a href="#" style="text-decoration: none;">' + '<h2 class="first-column">Olli - ' + counter + '</h2>' + '</a>' + '<h4 id ="' + counter + '" class="olli-active activeStatus"></h4>' + '</div>' + '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 padLeft" style="text-align: left;">' + '<div class="battery">' + '<img  class = "dashboard-img-width" src = "images/battery.png">' + ' <h4 style="display: inline" class="color-white bold-icon"  id="batterStatus' + counter + '"></h4>    ' + '</div>' + '<div class="speedometer">' + '<img class = "dashboard-img-width" src = "images/speed.png">' + '<h4  style="display: inline" class="color-white bold-icon" id="speed' + counter + '"></h4>' + '</div>' + '</div>' + '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' + '<a href="#" id="button">' + '<img  class="img-responsive" style="padding-top: 50px; width: 80px" src="images/stop.png"></a>' + '</div>' + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 down-column">' + '<h3 style = "margin-top: 15px;">Next Destination : <span id="destination' + counter + '" class="color-white">N/A</span></h3>' + '<h3 style = "margin-top: 15px;">Passenger Count : <span id="passenger' + counter + '" class="color-white">0</span></h3>' + ' <div class = "col-md-4 pad0"><h3 style = "margin-top: 15px;">A : <span id="adultCount' + counter + '" class="color-white"></span></h3></div><div class = "col-md-4 pad0"><h3 style = "margin-top: 15px;">C : <span id="childCount' + counter + '" class="color-white"></span></h3></div><div class = "col-md-4 pad0"><h3 style = "margin-top: 15px;">W : <span id="wheelCount' + counter + '" class="color-white"></span></h3></div> </div>' + ' </li>';
            $('.dashboard-li').append(olliList);
            Carmarker[i] = new google.maps.Marker({
                position: Position
                , map: map
                , icon: data_local.OlliMapIcons[i]
            });
        }
        var lat1;
        var lat2;
                var customVariables={};
        var secondCustomVariables = {};
        for ( var i = 0; i < data_local.VehicleId.length; i++ ){

          customVariables[data_local.VehicleId[i]] = 0;
            secondCustomVariables[i] = 0;
        }
        console.log(customVariables);
        console.log(secondCustomVariables);
        function getData() {
            for (var i = 0; i < data_local.VehicleId.length; i++) {
                getApi(i);

                function getApi(counter) {
                    $.get("https://gmk1qjbqu5.execute-api.us-east-1.amazonaws.com/live/location?vehicle_id=" + data_local.VehicleId[counter], function (data) {
                     
                        var apiCounter = counter + 1;
                        //Put values of passengers In and Out in these variables from the api like : data.pcInfo.passengers etc.
                        var Passengers = {
                            "totalNoOfPassengersAreIn": "50"
                            , "totalNoOfPassengerAreOut": "23"
                        };
                        var PassengerCount = Passengers.totalNoOfPassengersAreIn - Passengers.totalNoOfPassengerAreOut;
                        //Put values of adults In and Out in these variables from the api like : data.pcInfo.adults etc.
                        var adults = {
                            "totalNoOfadultsAreIn": "32"
                            , "totalNoOfadultsAreOut": "16"
                        };
                        var adultCount = adults.totalNoOfadultsAreIn - adults.totalNoOfadultsAreOut;
                        //Put values of children In and Out in these variables from the api like : data.pcInfo.children etc.
                        var children = {
                            "totalNoOfchildrenAreIn": "12"
                            , "totalNoOfchildrenAreOut": "6"
                        };
                        var childCount = children.totalNoOfchildrenAreIn - children.totalNoOfchildrenAreOut;
                        //Put values of wheelChair In and Out in these variables from the api like : data.pcInfo.wheelChair etc.
                        var wheelchair = {
                            "totalNoOfwheelChairAreIn": "6"
                            , "totalNoOfwheelChairAreOut": "1"
                        };
                        var wheelChairCount = wheelchair.totalNoOfwheelChairAreIn - wheelchair.totalNoOfwheelChairAreOut;
                        data = JSON.parse(data);
                        data = data.success.data[0];
                        Position = {
                            lat: parseFloat(data.latitude)
                            , lng: parseFloat(data.longitude)
                        }
 /*                       for ( var k = 0; k < data_local.VehicleId.length; k++ ){
                             if (data.vehicle_id == data_local.VehicleId[k]){
                   
                        var  lat1 = data.timeStamp;
                          setInterval(function(){
                          var   lat2 = data.timeStamp; 
                              if (lat1 == lat2) {
                                  console.log("lat1 "+lat1);
                                  console.log("lat2 "+lat2);
                                  console.log("inside NA");
                                $("#destination" + apiCounter).text("N/A");
                                $("#batterStatus" + apiCounter).text("N/A")
                                $("#speed" + apiCounter).text("N/A");
                                //Parsing the values of the passenger data in the respected Html.
                                $('#passenger' + apiCounter).text("N/A");
                                $('#adultCount' + apiCounter).text("N/A");
                                $('#childCount' + apiCounter).text("N/A");
                                $('#wheelCount' + apiCounter).text("N/A");
                                $('.dashboard-li .olli-active').text('InActive');
                                $('.dashboard-li .olli-active').removeClass('activeStatus');
                                $('.dashboard-li .olli-active').addClass('inactiveStatus');
                            }
                            else {
                                console.log("inside data");
                                $("#destination" + apiCounter).text(data_local.BusStopsNames['' + data.nextDestination + '']);
                                $("#batterStatus" + apiCounter).text(data.batterStatus)
                                $("#speed" + apiCounter).text(data.speed + " MPH");
                                //Parsing the values of the passenger data in the respected Html.
                                $('#passenger' + apiCounter).text(parseInt(PassengerCount));
                                $('#adultCount' + apiCounter).text(adultCount);
                                $('#childCount' + apiCounter).text(childCount);
                                $('#wheelCount' + apiCounter).text(wheelChairCount);
                                $('.dashboard-li .olli-active').text('Active');
                                $('.dashboard-li .olli-active').removeClass('inactiveStatus');
                                $('.dashboard-li .olli-active').addClass('activeStatus');
                            }
                          },1000);
                         
                      }
                            
                        }*/
                        
                        if (data.vehicle_id == data_local.VehicleId[counter]) {
                               customVariables[counter]   = data.timeStamp;
                                console.log('First' + 0+' : ' + customVariables[counter] );
                                setTimeout(function () {
                                     secondCustomVariables[counter] = data.timeStamp;
                                    console.log('Second' + 0 +' : ' + secondCustomVariables[counter] );
                                    if (customVariables[counter]  == secondCustomVariables[counter]) {
                                        $("#destination" + apiCounter).text("N/A");
                                        $("#batterStatus" + apiCounter).text("N/A")
                                        $("#speed" + apiCounter).text("N/A");
                                        //Parsing the values of the passenger data in the respected Html.
                                        $('#passenger' + apiCounter).text("N/A");
                                        $('#adultCount' + apiCounter).text("N/A");
                                        $('#childCount' + apiCounter).text("N/A");
                                        $('#wheelCount' + apiCounter).text("N/A");
                                        $('#' + apiCounter).text('InActive');
                                        $('#' + apiCounter).removeClass('activeStatus');
                                        $('#' + apiCounter).addClass('inactiveStatus');
                                    } else {
                                        $("#destination" + apiCounter).text(data_local.BusStopsNames['' + data.nextDestination + '']);
                                        console.log(data.nextDestination);
                                        $("#batterStatus" + apiCounter).text(data.batterStatus)
                                        $("#speed" + apiCounter).text(data.speed + " MPH");
                                        //Parsing the values of the passenger data in the respected Html.
                                        $('#passenger' + apiCounter).text(parseInt(PassengerCount));
                                        $('#adultCount' + apiCounter).text(adultCount);
                                        $('#childCount' + apiCounter).text(childCount);
                                        $('#wheelCount' + apiCounter).text(wheelChairCount);
                                        $('#' + apiCounter).text('Active');
                                        $('#' + apiCounter).removeClass('inactiveStatus');
                                        $('#' + apiCounter).addClass('activeStatus');
                                    }
                                }, 3000);
                            }
                        Carmarker[counter].setPosition(Position);
                    });
                }
            }
        }
        setInterval(getData, 1000);

        function addMarker(pos) {
            var marker = new google.maps.Marker({
                map: map
                , position: pos
                , icon: markerImage
            });
        }
        for (var i = 0; i < parseInt(data_local.BusStopsNumber); i++) {
            position_busStop = new google.maps.LatLng(data_local.BusStopsCoordinates[i].lat, data_local.BusStopsCoordinates[i].lng);
            addMarker(position_busStop);
        }
        setInterval(function () {
            google.maps.event.trigger(map, 'resize');
        }, 1000);
        $('.logo-icon').attr('src', data_local.DashboardLogo1);
        $('.logo-icon-2').attr('src', data_local.DashboardLogo2);
        $('.countryName h1').text(data_local.ClientName); 
    });
}
