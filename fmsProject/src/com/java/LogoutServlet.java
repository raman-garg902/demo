package com.java;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutServlet extends HttpServlet{
	
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
	System.out.println("git demo");
	
	HttpSession session=req.getSession();
	session.removeAttribute("username");
	session.invalidate();
	session.getMaxInactiveInterval();
	resp.sendRedirect("index.jsp");
    System.out.println("Well Done");
	System.out.println("Again ..");

}

}
