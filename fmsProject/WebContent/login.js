 var counter = 0;
        $.getJSON("login.json", function (data) {
            console.log(data);
            
       
         
            
            $('.login-button').on('click', function () {
                validate();
            });
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    document.getElementById('myBtn').click();
                }
            });
            $('#check').click(function () {
                $(this).is(':checked') ? $('#password').attr('type', 'text') : $('#password').attr('type', 'password');
            });
            function validate() {
                $('#username-text2').removeClass('display');
                $('#password-text2').removeClass('display');
                if ($('#username').val() != "" && $('#username').val() != data.client1.username && $('#username').val() != data.client2.username && $('#username').val() != data.client3.username && $('#username').val() != data.admin.username) {
                    $('#username-text2').addClass('display');
                    $('#username-text').removeClass('display');
                }
                if ($('#password').val() != "" && $('#password').val() != data.client1.password && $('#password').val() != data.client2.password && $('#password').val() != data.client3.password && $('#password').val() != data.admin.password) {
                    $('#password-text2').addClass('display');
                    $('#password-text').removeClass('display');
                }
                if ($('#username').val().length === 0 && $('#password').val().length === 0) {
                    $('#password-text,#username-text').addClass('display');
                }
                if ($('#username').val().length === 0) {
                    $('#username-text').addClass('display');
                }
                if ($('#password').val().length === 0) {
                    $('#password-text').addClass('display');
                }
                if ($('#username').val() == data.admin.username && $('#password').val() == data.admin.password) {
                    $('.login-button').attr('href', './' + data.admin.username + '/intermediatefile.html');
                    counter = "admin";
                    sessionStorage.setItem("on_load_counter", counter);
                }
                
                if ($('#username').val() == data.client1.username && $('#password').val() == data.client1.password) {
                    $('.login-button').attr('href', './' + data.client1.username + '/Dashboard.html');
                   counter = 1;
                    sessionStorage.setItem("on_load_counter", counter);
                }
                if ($('#username').val() == data.client2.username && $('#password').val() == data.client2.password) {
                    $('.login-button').attr('href', './' + data.client2.username + '/Dashboard.html');
                  counter = 2;
                    sessionStorage.setItem("on_load_counter", counter);
                }
                if ($('#username').val() == data.client3.username && $('#password').val() == data.client3.password) {
                    $('.login-button').attr('href', './' + data.client3.username + '/Dashboard.html');
                   counter = 3;
                    sessionStorage.setItem("on_load_counter", counter);
                }
            }
            
            
        });
        
        console.log(sessionStorage.getItem("on_load_counter"));
        
     