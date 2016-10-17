/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author strudel
 */
public class Lista implements Logica {

    @Override
    public String executa(HttpServletRequest req, HttpServletResponse res) throws Exception {
        req.setAttribute("fichas", Logica.fichas.getLista());
        return "lista.jsp";
    }

}
