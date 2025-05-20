package com.unl.practica2.base.controller.dao.dao_models;

import com.unl.practica2.base.controller.dao.AdapterDao;

import com.unl.practica2.base.models.Album;

public class DaoAlbum extends AdapterDao<Album>{
    private Album obj;

    public DaoAlbum(){
        super(Album.class);
    }
    
    public Album getObj() {
        if (obj == null)
            this.obj = new Album();
        return this.obj;
    }
    
    public void setObj(Album obj) {
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
}
