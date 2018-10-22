        
        $('#admlogout').on('click', function () {
            sessionStorage.clear();
            window.location.href = "../index.jsp";
        });
        $(document).ready(function () {
            
            var height = $(document).height();
            console.log(height);
            document.getElementById('one').style.height = (height - 95) + 'px';
             $.getJSON('http://localhost:2031/RESTfulExample/json/product/get',function(data){
            console.log(data);
                $.getJSON('../sample.json', (data_local) => {
                     console.log(data_local);                     
                     for ( var i = 0; i <data_local.Clients.length; i++ ){
                        var counter = i+1;
                        if ( data.name == data_local.Clients[i] ){
                            $('#one').attr("src", '../clientId' + counter + '/Dashboard.jsp');
                            $('#clientsName').val($('#clientsName > option:nth(' + i + ')').val());
                        }   
                     }
                     
                 }); 
              });
                 
//             if ( data.name == "Germany" ){
//                 $('#one').attr("src", "../clientId2/Dashboard.html");
//                  $('#clientsName').val($('#clientsName > option:nth(1)').val());
//             }  
//                 if ( data.name == "Australia" ){
//                 $('#one').attr("src", "../clientId3/Dashboard.html");
//                  $('#clientsName').val($('#clientsName > option:nth(2)').val());
//             }  
//         if ( data.name == "USA" ){
//                 $('#one').attr("src", "../clientId1/Dashboard.html");
//                  $('#clientsName').val($('#clientsName > option:nth(0)').val());
//             } 
    // iFrameDOM.find("#logout").hide();
    $('iframe').on("load", function() {
    // alert(1);
    var iFrameDOM = $("iframe").contents();

    iFrameDOM.find("#logout").hide();
}); 
            
       });


       $(document).on('click', "#go", function () {
              
            var client = $("#clientsName").val();
            //                var destPath = "/Dashboard.jsp";
            switch (client) {
            case "USA":
                $('#one').attr("src", "../clientId1/Dashboard.jsp");
                break;
            case "Germeny":
                $('#one').attr("src", "../clientId2/Dashboard.jsp");
                break;
            case "Australia":
                $('#one').attr("src", "../clientId3/Dashboard.jsp");
                break;
            case "Admin":
                // $('#one').attr("src", "../clientId3/Dashboard.jsp");
                window.location.href = "intermediatefile.jsp";
                break;
            }
                    // setTimeout(function(){
                    // var iframe = document.getElementById("one");
                    // var elmnt = iframe.contentWindow.document.getElementById('logout');
                    //     if(elmnt != null)
                    //         elmnt.style.display = "none";
                    // }, 60);
                  
    $('iframe').on("load", function() {
    var iFrameDOM = $("iframe").contents();

    iFrameDOM.find("#logout").hide();
});
        
        }); 
          