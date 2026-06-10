import type { Incidente, DatosNuevoIncidente } from './modelo.js';

// Arreglo global en memoria para guardar los datos
const listaIncidentes: Incidente[] = [];

// Variable global que funcionará como contador secuencial
let contadorId = 1;

export function guardarIncidente(datos: DatosNuevoIncidente): Incidente {
    // Convertimos el número actual a string para cumplir con la interfaz (1 -> "1")
    const idSecuencial = contadorId.toString();

    const nuevoIncidente: Incidente = {
        id: idSecuencial,
        ...datos,
        estado: 'abierto', 
        fechaCreacion: new Date()
    };

    listaIncidentes.push(nuevoIncidente);
    
    // Incrementamos el contador para el siguiente reporte que se ingrese
    contadorId++; 
    
    return nuevoIncidente;
}

export function obtenerIncidentes(): Incidente[] {
    return listaIncidentes;
}