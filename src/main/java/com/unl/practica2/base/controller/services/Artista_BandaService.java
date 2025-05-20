package com.unl.practica2.base.controller.services;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;

import com.unl.practica2.base.controller.dao.dao_models.DaoArtista;
import com.unl.practica2.base.controller.dao.dao_models.DaoArtista_Banda;
import com.unl.practica2.base.controller.dao.dao_models.DaoBanda;
import com.unl.practica2.base.models.Artista_Banda;
import com.unl.practica2.base.models.Banda;
import com.unl.practica2.base.models.Artista;
import com.unl.practica2.base.models.RolArtistaEnum;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@AnonymousAllowed
public class Artista_BandaService {
    private DaoArtista_Banda db;
    public Artista_BandaService(){
        db = new DaoArtista_Banda();
    }
    public void create(@NotEmpty String rol, Integer idArtista, Integer idBanda) throws Exception {
        if(rol.trim().length() > 0 && idArtista > 0 && idBanda > 0) {
            db.getObj().setRol(RolArtistaEnum.valueOf(rol));
            db.getObj().setIdArtista(idArtista);
            db.getObj().setIdBanda(idBanda);
            if(!db.save())
                throw new  Exception("No se pudo guardar los datos de la banda");
        }
    }

    public List<HashMap> listaArtista() {
        List<HashMap> lista = new ArrayList<>();
        DaoArtista da = new DaoArtista();
        if(!da.listAll().isEmpty()) {
            Artista [] arreglo = da.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i)); 
                aux.put("label", arreglo[i].getNombre()); 
                lista.add(aux);  
            }
        }
        return lista;
    }

    public List<HashMap> listaBanda() {
        List<HashMap> lista = new ArrayList<>();
        DaoBanda da = new DaoBanda();
        if(!da.listAll().isEmpty()) {
            Banda [] arreglo = da.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i)); 
                aux.put("label", arreglo[i].getNombre()); 
                lista.add(aux);  
            }
        }
        return lista;
    }

    public List<String> listRol() {
        List<String> lista = new ArrayList<>();
        for(RolArtistaEnum r: RolArtistaEnum.values()) {
            lista.add(r.toString());
        }        
        return lista;
    }

    public List<HashMap> listArtista_Banda() {
        List<HashMap> lista = new ArrayList<>();
        if (!db.listAll().isEmpty()) {
            Artista_Banda[] arreglo = db.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString(i));
                aux.put("rol", arreglo[i].getRol().toString());
                aux.put("idArtista", new DaoArtista().listAll().get(arreglo[i].getIdArtista() - 1).getNombre());
                aux.put("idBanda", new DaoBanda().listAll().get(arreglo[i].getIdBanda() - 1).getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }
    
}