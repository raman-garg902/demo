<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
    <meta charset="utf-8">
    <title>Login Olli</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="login.css" rel="stylesheet"> </head>

<body>


     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>

    
    <script>
        $.getJSON("login.json", function(data) {
            console.log(data);



            $('.login-button').on('click', function() {
                validate();
            });
            $(document).keypress(function(e) {
                if (e.which == 13) {
                    
                    document.getElementById('myBtn').click();
                }
            });
            $('#check').click(function() {
                $(this).is(':checked') ? $('#password').attr('type', 'text') : $('#password').attr('type', 'password');
            });

            function validate() {
                $('#username-text2').removeClass('display');
                $('#password-text2').removeClass('display');
                // if ($('#username').val() != "" && $('#username').val() != data.client1.username && $('#username').val() != data.client2.username && $('#username').val() != data.client3.username && $('#username').val() != data.admin.username) {
                //     $('#username-text2').addClass('display');
                //     $('#username-text').removeClass('display');
                // }
                // if ($('#password').val() != "" && $('#password').val() != data.client1.password && $('#password').val() != data.client2.password && $('#password').val() != data.client3.password && $('#password').val() != data.admin.password) {
                //     $('#password-text2').addClass('display');
                //     $('#password-text').removeClass('display');
                // }
                if ($('#username').val().length === 0 && $('#password').val().length === 0) {
                    $('#password-text,#username-text').addClass('display');
                }

                if ($('#username').val().length === 0) {
                    $('#username-text').addClass('display');
                }
                if ($('#password').val().length === 0) {
                    $('#password-text').addClass('display');
                }
                // if ($('#username').val() == data.admin.username && $('#password').val() == data.admin.password) {
                //     $('.login-button').attr('href', './' + data.admin.username + '/olliAdmin.html');

                // }
                // if ($('#username').val() == data.client1.username && $('#password').val() == data.client1.password) {
                //     $('.login-button').attr('href', './' + data.client1.username + '/Dashboard.html');

                // }
                // if ($('#username').val() == data.client2.username && $('#password').val() == data.client2.password) {
                //     $('.login-button').attr('href', './' + data.client2.username + '/Dashboard.html');
                // }
                // if ($('#username').val() == data.client3.username && $('#password').val() == data.client3.password) {
                //     $('.login-button').attr('href', './' + data.client3.username + '/Dashboard.html');
                // }
            }


        });
    </script>
    <div class="wrapper">
        <form class="form-signin" autocomplete="off" action="LoginController" method="POST">
            <h2 class="form-signin-heading">Olli login</h2>
            <input type="text" id="username" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
            <div id="username-text">Username is empty</div>
            <div id="username-text2">Username is incorrect</div>
            <input id="password" type="password" class="form-control" name="password" placeholder="Password" required="Fill out empty field" />

            <div id="password-text">Password is empty</div>
            <div id="password-text2">Password is incorrect</div>
            <input type="checkbox" value="check-me" id="check" name="check"> Show Password
            <!-- <a id="myBtn" class="login-button btn btn-lg btn-primary btn-block">Login</a>  -->
            <input type="submit" value="Login" id="myBtn" class="login-button btn btn-lg btn-primary btn-block"/>
        </form>
    </div>
   

</body>

</html>