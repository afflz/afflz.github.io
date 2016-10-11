/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bussiness;

import java.sql.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import persistence.DAO;

/**
 *
 * @author strudel
 */
public class Ficha {

    private int id;
    private String nome;
    private String cpf;
    private String end;
    private String delito;
    private Date data;
    private String hora;
    private String local;
    private String estado;
    private String foto;
    private static int lastId;

    static {
        try {
            lastId = DAO.getLastId();
        } catch (ServletException ex) {
            Logger.getLogger(Ficha.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Ficha() {

    }

    public Ficha(int id, String nome, String cpf, String end, String delito, Date data, String hora, String local, String estado) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.end = end;
        this.delito = delito;
        this.data = data;
        this.hora = hora;
        this.local = local;
        this.estado = estado;
    }

    public Ficha(String nome, String cpf, String end, String delito, Date data, String hora, String local, String estado) {
        this.id = ++lastId;
        this.nome = nome;
        this.cpf = cpf;
        this.end = end;
        this.delito = delito;
        this.data = data;
        this.hora = hora;
        this.local = local;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getDelito() {
        return delito;
    }

    public void setDelito(String delito) {
        this.delito = delito;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

}
