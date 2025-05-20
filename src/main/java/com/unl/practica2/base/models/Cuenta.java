package com.unl.practica2.base.models;

public class Cuenta {
    //Atributos:
    private Integer id;
    private String correo;
    private String clave;
    private boolean estado;
    //Asociacion:
    private Integer id_Persona;

    //Getters y Setters:
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getCorreo() {
        return this.correo;
    }
    
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    
    public String getClave() {
        return this.clave;
    }
    
    public void setClave(String clave) {
        this.clave = clave;
    }
    
    public boolean isEstado() {
        return this.estado;
    }
    
    public void setEstado(boolean estado) {
        this.estado = estado;
    }
    
    public Integer getId_Persona() {
        return this.id_Persona;
    }
    
    public void setId_Persona(Integer id_Persona) {
        this.id_Persona = id_Persona;
    }
    
    //Entidad Fuerte
}
