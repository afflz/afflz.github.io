/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import bussiness.Ficha;
import java.sql.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import persistence.DAO;

/**
 *
 * @author strudel
 */
public class Insere implements Logica {

    @Override
    public String executa(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String nome = request.getParameter("nome");
        String cpf = request.getParameter("cpf");
        String end = request.getParameter("end");
        String delito = request.getParameter("delito");
        String data = request.getParameter("data");
        String hora = request.getParameter("hora");
        String local = request.getParameter("local");
        String estado = request.getParameter("estado");

        Ficha f = new Ficha(nome, cpf, end, delito, Date.valueOf(data), hora, local, estado);

        DAO.insere(f);

        request.setAttribute("fichas", Logica.fichas.getLista());

        return "lista.jsp";
    }
}
