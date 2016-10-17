

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title> Inserir foto </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>    </head>
    <body>
        <div class="container">
            <h1>Insira a foto do meliante</h1>
            <form role="form" action="mvc">
                <input type="text" name="logica" value="InsereFoto" style="display: none"><br />
                <div class="form-group">
                    <label for="nome"> Insira o link da foto do meliante: </label>
                    <input class="form-control" type="text" name="foto" id="foto" />
                </div>
                <button type="submit" class="btn btn-default">Inserir</button>
                <a href="index.jsp"> <button type="button"class="btn btn-default"> Voltar </button> </a>
            </form>

        </div>
    </body>
</html>
