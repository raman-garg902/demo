   
//        $.getJSON('http://90.90.90.227:2031/RESTfulExample/json/product/get',function(data){
//            console.log(data);
//        });
        
        function test1() {
            var apiurl = "http://localhost:2031/RESTfulExample/json/product/post";
            var mridul = {
              "name" : $("#clientsName").val()  
            };
            
            var myJSON = JSON.stringify(mridul);
            $.ajax({
                type: "POST"
                , url: apiurl
                , data: myJSON
                , cache: false
                , crossDomain: true
                , headers: {
                    "Content-Type": "application/json"
                }
                , success: function (response) {
                    var output = JSON.parse(response);
                    console.log(output);
                }
            });
        }
        $("#go").click(function () {
            window.location.href = "olliAdmin.jsp";
            test1();
            
        });
          $('#logout').on('click',function(){
            sessionStorage.clear();
            window.location.href = "../index.jsp";
        });
        
//        $.ajax({
//    url: 'http://90.90.90.227:2031/RESTfulExample/json/product/get',
//    dataType: 'text',
//    type: 'GET',
//    async: true,
//    statusCode: {
//        404: function (response) {
//            alert(404);
//        },
//        200: function (response) {
//            alert(response);
//        }
//    },
//    error: function (jqXHR, status, errorThrown) {
//        alert('error');
//    }
//});
//        