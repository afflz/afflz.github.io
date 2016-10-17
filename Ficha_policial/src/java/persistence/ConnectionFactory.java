/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package persistence;

import java.sql.*;

/**
 *
 * @author strudel
 */
public class ConnectionFactory {

    private static Connection connection;

    public static Connection getConnection() {
        try {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            if (connection == null) {
                connection = DriverManager.getConnection("jdbc:mysql://150.164.102.160/daw-aluno13", "daw-aluno13", "daw13");
            }

            return connection;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
