<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Dashboard</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/loading-bar.css">
    <script src="js/loading-bar.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src='js/togeoJson.js'></script>
</head>

<body>
	
	<%
 		response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); // Http 1.1
		response.setHeader("Pragma","no-cache"); // Http 1.0
		response.setHeader("Expires","0"); // Proxies 

		if(session.getAttribute("username")==null){
			response.sendRedirect(request.getContextPath()+"/index.jsp");
		}
		else{
		System.out.println("olliAdmin "+session.getAttribute("username"));
		System.out.println("flag "+session.getAttribute("flag"));
		if(!request.getSession().getAttribute("username").equals("clientId1") && !request.getSession().getAttribute("flag").equals("test")){
			System.out.println("***********************");
			response.sendRedirect(request.getContextPath()+"/index.jsp");
			}   
		}
	%>
<!--    <script>
        console.log(sessionStorage.getItem("on_load_counter"));
        if (sessionStorage.getItem("on_load_counter") === null || sessionStorage.getItem("on_load_counter") == 0 || sessionStorage.getItem("on_load_counter") == 2 || sessionStorage.getItem("on_load_counter") == 3 ){
             window.location.href = "../index.html";
        }
       
      
    </script> -->
    
    <div class="wrapper">
        <section class="map-section">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-8 col-xs-12 nopadding map-Image dashboard-map"> <img class="logo-icon" src="">
                        <img class="logo-icon-2" src="">
                        <div class="dashboardMap" id="map1"></div>

                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-4 col-xs-12 nopadding dashboard-li">
                    <li class="countryName"><h1></h1>
                  <form action=<%=request.getContextPath()%>/LogoutServlet method="get">
                    <input type="submit" value="logout" style="float: right;" id="logout"/>
                    </form>
	              <!-- <button style="float: right;" id="logout" >Logout</button -->> 
                        
                        </li>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script>
        var counter = 0;

        function test(motion) {
            var apiurl = "https://gmk1qjbqu5.execute-api.us-east-1.amazonaws.com/live/config";
            var u_data = {
                "motion": motion,
                "vehicle_id": "1234"
            };
            var myJSON = JSON.stringify(u_data);
            $.ajax({
                type: "POST",
                url: apiurl,
                data: myJSON,
                cache: false,
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function(response) {
                    var output = JSON.parse(response);
                    //"{\"success\":{\"code\":\"2000\",\"message\":\"Data Pushed Successfully.\"}}"
                    //var result  = response.message;
                    //if(result == "Data Pushed Successfully.")
                    //{
                    console.log(output.success);
                    if (motion == "stop") {
                        setTimeout(function() {
                            test("run");
                        }, 1000);
                    }
                }
            });
        }

        function test1(motion) {
            var apiurl = "https://gmk1qjbqu5.execute-api.us-east-1.amazonaws.com/live/config";
            var u_data = {
                "motion": motion,
                "vehicle_id": "123"
            };
            var myJSON = JSON.stringify(u_data);
            $.ajax({
                type: "POST",
                url: apiurl,
                data: myJSON,
                cache: false,
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function(response) {
                    var output = JSON.parse(response);
                    //"{\"success\":{\"code\":\"2000\",\"message\":\"Data Pushed Successfully.\"}}"
                    //var result  = response.message;
                    //if(result == "Data Pushed Successfully.")
                    //{
                    console.log(output.success);
                    if (motion == "stop") {
                        setTimeout(function() {
                            test1("run");
                        }, 1000);
                    }
                }
            });
        }
        $('#button').on('click', function() {
            //alert('Clicked  1234');
            //test("stop");
        });
        $('#button1').on('click', function() {
            //alert('Clicked 123');
            //test1("stop");
        });
        //  document.getElementById("button").onclick = function () {
        //         location.href = "./index.html";
        //       sessionStorage.setItem("button","clicked");
        //  };
        
        
        $.getJSON('./config_Dashboard.json', function(data_session) {
            var GOOGLE_MAP_KEY = data_session.GoogleMapsApiKey;

            function loadScript() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAP_KEY + '&callback=initMap'; //& needed
                document.body.appendChild(script);
            }
            $(document).ready(function(){
                loadScript();
            });
        });
      $('#logout').on('click',function(){
            sessionStorage.clear();
            window.location.href = "../index.jsp";
        });
    </script>
<!--    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCs9k9W8PyLIgs6hdEERLKm4m2tE-qcx28&callback=initMap" type="text/javascript"></script>-->
    <script src="./js/newMap.js"></script>
    <script>
    </script>

</body>
</html>