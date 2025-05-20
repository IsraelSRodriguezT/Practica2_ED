package com.unl.practica2.base.controller.dao.dao_models;

import com.unl.practica2.base.controller.dao.AdapterDao;

import com.unl.practica2.base.models.Genero;

public class DaoGenero extends AdapterDao<Genero>{
    private Genero obj;

    public DaoGenero(){
        super(Genero.class);
    }
    
    public Genero getObj() {
        if (obj == null)
            this.obj = new Genero();
        return this.obj;
    }
    
    public void setObj(Genero obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength()+1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            //Log de error
            e.printStackTrace();
            System.out.println(e);
            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj,pos);
            return true;
        } catch (Exception e) {
            //Log de error
            return false;
            // TODO: handle exception
        }
    }

    public static void main (String[] args) {
        DaoGenero da = new DaoGenero();
        da.getObj().setId(da.listAll().getLength()+1);
        da.getObj().setNombre("Rock");
        if (da.save()) {
            System.out.println("Guardado");
        } else{
            System.out.println("Hubo un error");
        }
        da.setObj(null);
        da.getObj().setId(da.listAll().getLength()+1);
        da.getObj().setNombre("Jazz");
        if (da.save()) {
            System.out.println("Guardado");
        } else{
            System.out.println("Hubo un error");
        }
    }
}
