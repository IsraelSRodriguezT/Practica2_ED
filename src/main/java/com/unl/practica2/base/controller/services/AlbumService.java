package com.unl.practica2.base.controller.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.unl.practica2.base.controller.dao.dao_models.DaoAlbum;
import com.unl.practica2.base.controller.dao.dao_models.DaoBanda;
import com.unl.practica2.base.models.Album;
import com.unl.practica2.base.models.Banda;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

@BrowserCallable
@Transactional(propagation = Propagation.REQUIRES_NEW)
@AnonymousAllowed

public class AlbumService {
    private DaoAlbum da;
    public AlbumService() {
        da = new DaoAlbum();
    }

    public void create(@NotEmpty @Size(max = 50) String nombre, @PastOrPresent Date fecha, Integer idBanda) throws Exception{
        if(nombre.trim().length() > 0 && fecha != null && idBanda > 0) {
            da.getObj().setNombre(nombre);
            da.getObj().setFecha(fecha);
            da.getObj().setIdBanda(idBanda);
            if(!da.save())
                throw new  Exception("No se pudo guardar los datos de la banda");
        }
    }

    public List<HashMap> listaBanda() {
        List<HashMap> lista = new ArrayList<>();
        DaoBanda db = new DaoBanda();
        if(!db.listAll().isEmpty()) {
            Banda [] arreglo = db.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i)); 
                aux.put("label", arreglo[i].getNombre()); 
                lista.add(aux);  
            }
        }
        return lista;
    }

    public List<HashMap> listAlbum() {
        List<HashMap> lista = new ArrayList<>();
        if (!da.listAll().isEmpty()) {
            Album[] arreglo = da.listAll().toArray(); 
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString(i));
                aux.put("nombre", arreglo[i].getNombre());
                aux.put("fecha", arreglo[i].getFecha().toString());
                aux.put("idBanda",new DaoBanda().listAll().get(arreglo[i].getIdBanda() - 1).getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }
}