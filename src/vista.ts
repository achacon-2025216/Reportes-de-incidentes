import { obtenerIncidentes } from './controlador.js';

// Imprime las opciones disponibles en la terminal
export function mostrarMenu(): void {
    console.log('\n======================================================');
    console.log('        SISTEMA DE REPORTES DE CLASE (C27)');
    console.log('======================================================');
    console.log(' 1. Reportar un problema de la clase');
    console.log(' 2. Ver todos los reportes clasificados');
    console.log(' 3. Salir del sistema');
    console.log('======================================================');
    process.stdout.write('Elige una opción (1-3): ');
}

// Renderiza la tabla estructurada con los reportes existentes
export function mostrarTablaIncidentes(): void {
    const datos = obtenerIncidentes();

    console.log('\n======================================================');
    console.log('           LISTADO ACTUAL DE REPORTES');
    console.log('======================================================');

    if (datos.length === 0) {
        console.log(' [AVISO] No hay ningún incidente registrado aún.');
        console.log('======================================================\n');
        return;
    }

    // console.table acomoda las propiedades del objeto de forma nativa en filas y columnas
    console.table(datos);
    console.log(`Total de casos registrados: ${datos.length}`);
    console.log('======================================================\n');
}

export function pintarAviso(tipo: 'OK' | 'ERROR' | 'INFO', texto: string): void {
    if (tipo === 'OK') console.log(`\n[OK] -> ${texto}`);
    if (tipo === 'ERROR') console.log(`\n[ALERTA] -> ${texto}`);
    if (tipo === 'INFO') console.log(`\n[SISTEMA] -> ${texto}`);
}