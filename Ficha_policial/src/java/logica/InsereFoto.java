/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import persistence.DAO;

/**
 *
 * @author strudel
 */
public class InsereFoto implements Logica {

    @Override
    public String executa(HttpServletRequest request, HttpServletResponse res) throws Exception {
        int meliante = Integer.parseInt(request.getParameter("id"));
        String foto = request.getParameter("foto");

        DAO.insereFoto(meliante, foto);

        return "lista.jsp";
    }

}
