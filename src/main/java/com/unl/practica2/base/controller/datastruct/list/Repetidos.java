package com.unl.practica2.base.controller.datastruct.list;

public class Repetidos {

    public static String[] agregarDatosArreglo(String[] datos, String[] arreglo) {
        for (int i = 0; i < datos.length; i++) {
            arreglo[i] = datos[i];
        }
        return arreglo;
    }

    public static LinkedList<String> detectarRepetidosEnArreglo(String[] arreglo) {
        LinkedList<String> repetidos = new LinkedList<>();
        LinkedList<String> vistos = new LinkedList<>();
    
        for (String elemento : arreglo) {
            if (elemento == null) continue;
            if (vistos.contains(elemento)) {
                if (!repetidos.contains(elemento)) {
                    repetidos.add(elemento);
                }
            } else {
                vistos.add(elemento);
            }
        }
        return repetidos;
    }

    public static LinkedList<String> agregarDatosListaE(String[] datos, LinkedList<String> listaE) {
        for (int i = 0; i < datos.length; i++) {
            listaE.add(datos[i]);
        }
        return listaE;
    }

    public static LinkedList<String> detectarRepetidosEnLista(LinkedList<String> lista) {
        LinkedList<String> repetidos = new LinkedList<>();
        LinkedList<String> vistos = new LinkedList<>();
    
        for (int i = 0; i < lista.getLength(); i++) {
            String actual = lista.get(i);
            if (actual == null) continue;
            if (vistos.contains(actual)) {
                if (!repetidos.contains(actual)) {
                    repetidos.add(actual);
                }
            } else {
                vistos.add(actual);
            }
        }
        return repetidos;
    }
}