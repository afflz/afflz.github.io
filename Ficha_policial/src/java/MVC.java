
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import logica.Logica;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author strudel
 */
@WebServlet(urlPatterns = {"/mvc"})
public class MVC extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String parametro = request.getParameter("logica");
        String nomeDaClasse = "logica." + parametro;

        try {
            Class classe = Class.forName(nomeDaClasse);
            Logica logica = (Logica) classe.newInstance();
            String pagina = logica.executa(request, response);
            request.getRequestDispatcher(pagina).forward(request, response);
        } catch (Exception e) {
            response.getWriter().print(e);
//            throw new ServletException(
//                    "A lógica de negócios causou uma exceção ", e);
        }

    }
}
