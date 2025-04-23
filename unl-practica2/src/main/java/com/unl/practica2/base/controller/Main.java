// mida el rendimiento de una lista enlazada vs un arreglo, use la misma data del archivo data.txt en la carpeta inicial del proyecto
// Llenar el arreglo y la lista enlazada
// Se debe detectar si un elemento de la data esta igual se debe guardar en otro lugar, luego presentar y contar cuantos elementos han estado repetidos.
// Medir el rendimiento como en la practica 1
// Tabla comparativa de los tiempos que se demora x 3 veces
import java.io.*;
import java.util.*;
public class Main{
	public static void main (String[] args){
		//Archivo data
		String archivo = "data.txt";
        List<Integer> data = readDataFromFile(archivo);
        //Arreglos para guardar los 3 tiempos a comparar
        long[] tiempoArreglo = new long [3];
        long[] tiempoListaEnlazada = new long[3];
        //Bucle para cada tiempo
		for (int i = 0; i < 3; i++) {
			//Para el arreglo
			long tiempoInicio = System.nanoTime();
			int[] arreglo = new int[data.size()];
			int[] arregloRepetido = new int[(data.size())/2];
			for (int j = 0; j < data.size(); j++) {
                int valor = data.get(j);
                for(int k = 0; k < j ; k++){
                	if (arreglo[k] == valor) {
                		arregloRepetido[].add(valor);
                		k = j-1;
                	} else if (k == j-1) {
                		arreglo[j] = valor;
                	}
                }
            }
            long tiempoFin = System.nanoTime();
            tiempoArreglo[i] = tiempoInicio - tiempoFin;
			//Para la lista enlazada
			tiempoInicio = System.nanoTime(); 
			LinkedList<Integer> listaEnlazada = new LinkedList<>();
			LinkedList<Integer> listaEnlazadaRepetida = new LinkedList<>();
			for (int j = 0; j < data.size(); j++) {
                int valor = data.get(j);
                for(int k = 0; k < j ; k++){
                	if (listaEnlazada.get(k) == valor) {
                		listaEnlazadaRepetida.add(valor);
                		k = j-1;
                	} else if (k == j-1) {
                		listaEnlazada.add(valor);
                	}
                }
            }
            tiempoFin = System.nanoTime();
            tiempoListaEnlazada[i] = tiempoInicio - tiempoFin;
            if (i == 0) {
                System.out.println("Elementos repetidos:");
                System.out.println(arregloRepetido);
                System.out.println("Cantidad de repetidos: " + arregloRepetido[].size());
            }
		}
        System.out.println("\nComparativa de tiempos en ns):");
        System.out.println("Iteración\tArreglo\t\tLista Enlazada");
        for (int i = 0; i < 3; i++) {
            System.out.printf("%d\t\t%d\t%d%n", i + 1, tiempoArreglo[i], tiempoListaEnlazada[i]);
        }
	}
	public static List<Integer> readDataFromFile(String filename) {
        List<Integer> data = new ArrayList<>();
        try (Scanner scanner = new Scanner(new File(filename))) {
            while (scanner.hasNextInt()) {
                data.add(scanner.nextInt());
            }
        } catch (FileNotFoundException e) {
            System.err.println("Archivo no encontrado: " + filename);
        }
        return data;
    }

}