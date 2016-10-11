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
public interface Logica {

    public static DAO fichas = new DAO();

    String executa(HttpServletRequest req, HttpServletResponse res)
            throws Exception;
}
