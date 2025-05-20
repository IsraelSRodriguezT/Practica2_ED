package com.unl.practica2.base.controller.datastruct.list;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ArchivoReader {

    public static String[] leerArchivo(String rutaArchivo) {
        try (BufferedReader br = new BufferedReader(new FileReader(rutaArchivo))) {
            String linea;
            StringBuilder contenido = new StringBuilder();
            while ((linea = br.readLine()) != null) {
                contenido.append(linea).append(",");
            }
            return contenido.toString().split(",");
        } catch (IOException e) {
            System.err.println("Error al leer el archivo: " + e.getMessage());
        }
        return new String[0];
    }

    public static void main(String[] args) {
        String rutaArchivo = "src/main/resources/data.txt";
        String[] datos = leerArchivo(rutaArchivo);
        if (datos.length == 0) {
            System.out.println("El archivo está vacío o no se pudo leer.");
            return;
        }
    
        long inicioArreglo = System.currentTimeMillis();
        LinkedList<String> repetidosA = Repetidos.detectarRepetidosEnArreglo(Repetidos.agregarDatosArreglo(datos, new String[datos.length]));
        long finArreglo = System.currentTimeMillis();
        System.out.println(repetidosA.print());
        System.out.println("El tamaño del arreglo es " + repetidosA.getLength());
        System.out.println("El tiempo que demoro en detectar el arreglo fue de " + (finArreglo - inicioArreglo) + " milisegundos\n");
        
        
        long inicioLista = System.currentTimeMillis();
        LinkedList<String> repetidosL = Repetidos.detectarRepetidosEnLista(Repetidos.agregarDatosListaE(datos, new LinkedList<>()));
        long finLista = System.currentTimeMillis();
        System.out.println(repetidosL.print());
        System.out.println("El tamaño de la lista enlazada es " + repetidosL.getLength());
        System.out.println("El tiempo que demoro en llenar la lista enlazada fue de " + (finLista - inicioLista) + " milisegundos\n");
    
    }
}