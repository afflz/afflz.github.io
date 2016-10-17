/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import bussiness.Ficha;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import persistence.DAO;

/**
 *
 * @author strudel
 */
public class Remove implements Logica {

    @Override
    public String executa(HttpServletRequest req, HttpServletResponse res) throws Exception {
        int id = Integer.parseInt(req.getParameter("id"));
        Ficha ficha = new Ficha();
        ficha.setId(id);
        DAO.remove(ficha);

        req.setAttribute("fichas", Logica.fichas.getLista());

        return "remove.jsp";
    }
}
