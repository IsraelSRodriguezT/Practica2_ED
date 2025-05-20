package com.unl.practica2.base.controller.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.unl.practica2.base.controller.dao.dao_models.DaoGenero;
import com.unl.practica2.base.models.Genero;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@BrowserCallable
@AnonymousAllowed
public class GeneroService {
    private DaoGenero dg;
    public GeneroService(){
        dg = new DaoGenero();
    }

    public void create(@NotEmpty @Size(max = 15) String nombre) throws Exception {
        if(nombre.trim().length() > 0) {
            dg.getObj().setNombre(nombre);
            if(!dg.save())
                throw new  Exception("No se pudo guardar los datos de la banda");
        }
    }

    public List<HashMap> listGenero() {
        List<HashMap> lista = new ArrayList<>();
        if (!dg.listAll().isEmpty()) {
            Genero[] arreglo = dg.listAll().toArray();
            for (int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString(i));
                aux.put("nombre", arreglo[i].getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }
}
