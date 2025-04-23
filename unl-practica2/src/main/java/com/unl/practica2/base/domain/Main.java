import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String filename = "data.txt";
        List<Integer> data = readDataFromFile(filename);

        long[] tiemposArreglo = new long[3];
        long[] tiemposLista = new long[3];

        for (int i = 0; i < 3; i++) {
            // Arreglo
            long start = System.nanoTime();
            int[] arreglo = new int[data.size()];
            Set<Integer> repetidosArreglo = new HashSet<>();
            Set<Integer> vistosArreglo = new HashSet<>();
            for (int j = 0; j < data.size(); j++) {
                int val = data.get(j);
                arreglo[j] = val;
                if (!vistosArreglo.add(val)) {
                    repetidosArreglo.add(val);
                }
            }
            long end = System.nanoTime();
            tiemposArreglo[i] = end - start;

            // Lista enlazada
            start = System.nanoTime();
            LinkedList<Integer> listaEnlazada = new LinkedList<>();
            Set<Integer> repetidosLista = new HashSet<>();
            Set<Integer> vistosLista = new HashSet<>();
            for (int val : data) {
                listaEnlazada.add(val);
                if (!vistosLista.add(val)) {
                    repetidosLista.add(val);
                }
            }
            end = System.nanoTime();
            tiemposLista[i] = end - start;

            // Mostrar elementos repetidos solo la primera vez
            if (i == 0) {
                System.out.println("Elementos repetidos:");
                System.out.println(repetidosArreglo);
                System.out.println("Cantidad de repetidos: " + repetidosArreglo.size());
            }
        }

        // Mostrar tabla comparativa
        System.out.println("\nComparativa de tiempos (nanosegundos):");
        System.out.println("Iteración\tArreglo\t\tLista Enlazada");
        for (int i = 0; i < 3; i++) {
            System.out.printf("%d\t\t%d\t%d%n", i + 1, tiemposArreglo[i], tiemposLista[i]);
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
