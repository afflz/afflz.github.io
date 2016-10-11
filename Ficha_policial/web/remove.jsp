
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Main page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>        <%@taglib uri ="http://java.sun.com/jsp/jstl/core" prefix ="c"%>
        <%@taglib uri ="http://java.sun.com/jsp/jstl/fmt" prefix ="fmt"%>

    </head>
    <body>
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"> Delegacia </a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                    <ul class="nav navbar-nav">
                        <li class="active"><a href="index.jsp"><p>Home</p></a></li>
                        <li><a href="adiciona.html"><p>Adiciona ficha</p></a></li> 
                        <li><a href="mvc?logica=Lista"><p>Lista fichas</p></a></li>
                        <li><a href="remove.jsp"><p>Remove fichas</p></a></li>
                        <li><a href="foragidos.jsp"><p>Lista Foragidos</p></a></li> 
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container">
            <div class="table-responsive">          
                <table class="table table-striped table-bordered">
                    <thead>
                    <td> Delito </td>
                    <td> Nome </td>
                    <td> CPF </td>
                    <td> EndereÃ§o </td>
                    <td> Data/Hora </td>
                    <td> Local </td>    
                    <td> Estado </td>  
                    </thead>
                    <jsp:useBean id="dao" class="persistence.DAO" />
                    <c:forEach var="ficha" items="${dao.listaNome}">
                        <tr >
                            <td> ${ficha.delito} </td>
                            <td> ${ficha.nome} </td>
                            <td> ${ficha.cpf} </td>
                            <td> ${ficha.end} </td>
                            <td> <fmt:formatDate value="${ficha.data}" pattern ="dd/MM/yyyy"/> / ${ficha.hora} </td>
                            <td> ${ficha.local} </td>
                            <td> ${ficha.estado} </td>                        
                            <td> <a href="mvc?logica=Remove&id=${ficha.id}"> remover </a> </td>
                        </tr>
                    </c:forEach >
                </table>
            </div>
            <a href="index.jsp"> <button type="button"class="btn btn-default"> Voltar </button> </a>
        </div>
    </body>
</html>
