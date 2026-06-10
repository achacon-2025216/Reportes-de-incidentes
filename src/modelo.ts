export type Prioridad = 'baja' | 'media' | 'alta';
export type EstadoIncidente = 'abierto' | 'en progreso' | 'resuelto';

// El contrato base de un incidente según los lineamientos compartidos
export interface Incidente {
    readonly id: string; 
    titulo: string;
    reportadoPor: string; 
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}

// DTO: Datos necesarios para reportar desde la terminal (excluye id, estado y fecha)
export type DatosNuevoIncidente = Omit<Incidente, 'id' | 'estado' | 'fechaCreacion'>;