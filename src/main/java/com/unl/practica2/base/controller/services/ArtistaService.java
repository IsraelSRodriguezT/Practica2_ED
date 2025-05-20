package com.unl.practica2.base.controller.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.unl.practica2.base.controller.dao.dao_models.DaoArtista;
import com.unl.practica2.base.models.Artista;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@BrowserCallable
@Transactional(propagation = Propagation.REQUIRES_NEW)
@AnonymousAllowed

public class ArtistaService {
    private DaoArtista da;
    public ArtistaService() {
        da = new DaoArtista();
    }

    public void create(@NotEmpty @Size(max = 25) String nombre,@NotEmpty String nacionalidad) throws Exception{
        if(nombre.trim().length() > 0 && nacionalidad.trim().length() > 0) {
            da.getObj().setNombre(nombre);
            da.getObj().setNacionalidad(nacionalidad);
            if(!da.save())
                throw new  Exception("No se pudo guardar los datos de la banda");
        }
    }
    

    public List<String> listCountry() {
        List<String> nacionalidades = new ArrayList<>();
        String[] countryCodes = Locale.getISOCountries();
        for (String countryCode : countryCodes) {
            Locale locale = new Locale("", countryCode);
            nacionalidades.add(locale.getDisplayCountry());
        }
        
        return nacionalidades;
    }

    public List<HashMap> listArtista() {
        List<HashMap> lista = new ArrayList<>();
        if (!da.listAll().isEmpty()) {
            Artista[] arreglo = da.listAll().toArray(); 
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString(i));
                aux.put("nombre", arreglo[i].getNombre());
                aux.put("nacionalidad", arreglo[i].getNacionalidad());
                lista.add(aux);
            }
        }
        return lista;
    }
}