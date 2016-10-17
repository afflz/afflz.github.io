/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package persistence;

import bussiness.Ficha;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;

/**
 *
 * @author strudel
 */
public class DAO {

    private static Connection connection = ConnectionFactory.getConnection();

    public static void insere(Ficha f) throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("INSERT INTO fichapolicial VALUES(?,?,?,?,?,?,?,?,?,?)");

            stmt.setInt(1, f.getId());
            stmt.setString(2, f.getNome());
            stmt.setString(3, f.getCpf());
            stmt.setString(4, f.getEnd());
            stmt.setString(5, f.getDelito());
            stmt.setDate(6, f.getData());
            stmt.setString(7, f.getHora());
            stmt.setString(8, f.getLocal());
            stmt.setString(9, f.getEstado());
            stmt.setString(10, "http://hypescience.com/wp-content/uploads/2013/05/Male_Silhouette.png");

            stmt.execute();
            stmt.close();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static void insereFoto(int meliante, String image) throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("UPDATE fichapolicial SET foto = ? WHERE id = ?");
            stmt.setString(1, image);
            stmt.setInt(2, meliante);
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }

    }

    public static void altera(Ficha f) throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("UPDATE fichapolicial SET nome = ?, cpf = ?, end = ?, delito = ?, data = ?, hora = ?, local = ?, estado = ? WHERE id = ?");

            stmt.setString(1, f.getNome());
            stmt.setString(2, f.getCpf());
            stmt.setString(3, f.getEnd());
            stmt.setString(4, f.getDelito());
            stmt.setDate(5, f.getData());
            stmt.setString(6, f.getHora());
            stmt.setString(7, f.getLocal());
            stmt.setString(8, f.getEstado());
            stmt.setInt(9, f.getId());

            stmt.execute();
            stmt.close();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static void remove(Ficha f) throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("DELETE FROM fichapolicial WHERE id = ?");

            stmt.setInt(1, f.getId());

            stmt.execute();
            stmt.close();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static Ficha localizaID(int id) throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT * FROM fichapolicial WHERE id = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new Ficha(rs.getInt("id"), rs.getString("nome"), rs.getString("cpf"), rs.getString("end"), rs.getString("delito"), rs.getDate("data"), rs.getString("hora"), rs.getString("local"), rs.getString("estado"));
            }

            throw new SQLException();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static ArrayList<Ficha> getListas() throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT * FROM fichapolicial ORDER BY delito, nome");
            ResultSet rs = stmt.executeQuery();

            ArrayList<Ficha> tmpList = new ArrayList<Ficha>();

            while (rs.next()) {
                tmpList.add(new Ficha(rs.getInt("id"), rs.getString("nome"), rs.getString("cpf"), rs.getString("end"), rs.getString("delito"), rs.getDate("data"), rs.getString("hora"), rs.getString("local"), rs.getString("estado")));
            }

            return tmpList;
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static int getLastId() throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT MAX(id) FROM fichapolicial");
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return rs.getInt("MAX(id)");
            }

            throw new SQLException();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public ArrayList<Ficha> getLista() throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT * FROM fichapolicial ORDER BY delito, nome");
            ResultSet rs = stmt.executeQuery();

            ArrayList<Ficha> tmpList = new ArrayList<Ficha>();

            while (rs.next()) {
                Ficha tmp = new Ficha(rs.getInt("id"), rs.getString("nome"), rs.getString("cpf"), rs.getString("end"), rs.getString("delito"), rs.getDate("data"), rs.getString("hora"), rs.getString("local"), rs.getString("estado"));
                if (rs.getString("foto") != null) {
                    tmp.setFoto(rs.getString("foto"));
                }
                tmpList.add(tmp);
            }

            return tmpList;
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public ArrayList<Ficha> getForagidos() throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT * FROM fichapolicial WHERE estado = ?");
            stmt.setString(1, "foragido");
            ResultSet rs = stmt.executeQuery();

            ArrayList<Ficha> tmpList = new ArrayList<Ficha>();

            while (rs.next()) {
                Ficha tmp = new Ficha(rs.getInt("id"), rs.getString("nome"), rs.getString("cpf"), rs.getString("end"), rs.getString("delito"), rs.getDate("data"), rs.getString("hora"), rs.getString("local"), rs.getString("estado"));
                if (rs.getString("foto") != null) {
                    tmp.setFoto(rs.getString("foto"));
                }
                tmpList.add(tmp);
            }

            return tmpList;
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public ArrayList<Ficha> getListaNome() throws ServletException {
        try {
            PreparedStatement stmt = connection.prepareStatement("SELECT * FROM fichapolicial ORDER BY nome");
            ResultSet rs = stmt.executeQuery();

            ArrayList<Ficha> tmpList = new ArrayList<Ficha>();

            while (rs.next()) {
                Ficha tmp = new Ficha(rs.getInt("id"), rs.getString("nome"), rs.getString("cpf"), rs.getString("end"), rs.getString("delito"), rs.getDate("data"), rs.getString("hora"), rs.getString("local"), rs.getString("estado"));
                tmpList.add(tmp);
            }

            return tmpList;
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }
}
