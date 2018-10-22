<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <style>
        .clientContainer {
            background: #6262cc;
            padding: 20px 0px;
            text-align: center;
        }
        
        .clientSelect,
        .goButton {
            font-size: 18px;
            padding: 5px 10px;
            background: #fff;
        }
        
        .goButton {
            margin-left: 30px;
        }
        
        iframe {
            width: 100%;
            border: 0;
        }
 
    </style>
    
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<!--
    <script>
        console.log(sessionStorage.getItem("on_load_counter"));
        if (sessionStorage.getItem("on_load_counter") === null || sessionStorage.getItem("on_load_counter") == 0 || sessionStorage.getItem("on_load_counter") == 1 || sessionStorage.getItem("on_load_counter") == 2 || sessionStorage.getItem("on_load_counter") == 3) {
            window.location.href = "../index.html";
        }
    </script>
-->

<%
		response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); // Http 1.1
		response.setHeader("Pragma","no-cache"); // Http 1.0
		response.setHeader("Expires","0"); // Proxies
	
		if(session.getAttribute("username")==null){
			response.sendRedirect(request.getContextPath()+"/index.jsp");
		}
		else{
		System.out.println("olliAdmin "+session.getAttribute("username"));
		if(!session.getAttribute("username").equals("LMadmin")){
			response.sendRedirect(request.getContextPath()+"/index.jsp");
			} 
		}
	%>
    <div class="clientContainer">
        <select id="clientsName" class="clientSelect">
            <option value="USA">USA</option>
            <option value="Germeny">Germeny</option>
            <option value="Australia">Australia</option>
            <option value="Admin">Admin</option>
        </select>
        <input type="button" value="Go" id="go" class="goButton">
        <!-- <button style="float: right;" id="admlogout">Logout</button> -->
			<form action=<%=request.getContextPath()%>/LogoutServlet method="get">
            <input type="submit" value="logout" style="float: right;" id="logout"/>
                 </form>
    </div>
    <iframe id="one" src="" ></iframe>
    <script src="olliAdmin.js"></script>
</body>

</body>
</html>