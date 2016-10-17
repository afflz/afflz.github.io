

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Alterar Ficha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>    </head>
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
                        <li><a href="index.jsp"><p>Home</p></a></li>
                        <li><a href="adiciona.html"><p>Adiciona ficha</p></a></li> 
                        <li><a href="mvc?logica=Lista"><p>Lista fichas</p></a></li>
                        <li><a href="remove.jsp"><p>Remove fichas</p></a></li>
                        <li><a href="foragidos.jsp"><p>Lista Foragidos</p></a></li> 
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container">
            <form role="form" action="mvc" method="post">
                <input type="text" name="logica" value="Altera" style="display: none"><br />
                <input type="number" name="id" value="${param.id}" style="display: none"><br />
                <div class="form-group">
                    <label for="nome"> Nome: </label>
                    <input class="form-control" id="nome" type="text" name="nome" value="${param.nome}"/>
                </div>
                <div class="form-group">
                    <label for="cpf"> CPF: </label>
                    <input class="form-control" id="cpf" type="text" name="cpf" value="${param.cpf}"/>
                </div>
                <div class="form-group">
                    <label for="end"> Endereço: </label>
                    <input class="form-control" id="end" type="text" name="end" value="${param.end}"/>
                </div>
                <div class="form-group">
                    <label for="delito"> Delito: </label>
                    <input class="form-control" id="delito" type="text" name="delito" value="${param.delito}"/>
                </div>
                <div class="form-group">
                    <label for="data"> Data: </label>
                    <input class="form-control" id="data" type="text" name="data" value="${param.data}"/>
                </div>
                <div class="form-group">
                    <label for="hora"> Hora: </label>    
                    <input class="form-control" id="hora" type="text" name="hora" value="${param.hora}" />
                </div>
                <div class="form-group">
                    <label for="local"> Local: </label>
                    <input class="form-control" id="local" type="text" name="local" value="${param.local}"/>
                </div>
                <div class="form-group">
                    <label for="estado"> Estado: </label>
                    <input class="form-control" id="local" type="text" name="estado" value="${param.estado}"/>
                </div>
                <button type="submit" class="btn btn-default">Alterar</button>

            </form>
        </div>
    </body>
</html>