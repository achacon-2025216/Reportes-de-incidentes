import readline from 'readline';
import { guardarIncidente } from './controlador.js';
import { mostrarMenu, mostrarTablaIncidentes, pintarAviso } from './vista.js';
import type { Prioridad } from './modelo.js'; 

// Configuración de la interfaz nativa de Node para leer el teclado de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promesa auxiliar para leer de forma asíncrona la respuesta del usuario
const hacerPregunta = (pregunta: string): Promise<string> => {
    return new Promise((resolve) => rl.question(pregunta, resolve));
};

async function ejecutarSistema() {
    let salir = false;

    while (!salir) {
        mostrarMenu();
        const opcion = await hacerPregunta('');

        switch (opcion.trim()) {
            case '1':
                console.log('\n--- NUEVO REPORTE DE PROBLEMA ---');
                const titulo = await hacerPregunta('¿Cuál es el problema/título?: ');
                const reportadoPor = await hacerPregunta('¿Quién lo reporta?: ');
                
                let prioridadInput = '';
                let prioridadValida: Prioridad = 'media';

                // Bucle de validación estricta para el tipo de unión (baja | media | alta)
                while (true) {
                    prioridadInput = await hacerPregunta('Clasificación de prioridad (baja, media, alta): ');
                    const limpio = prioridadInput.trim().toLowerCase();
                    
                    if (limpio === 'baja' || limpio === 'media' || limpio === 'alta') {
                        prioridadValida = limpio as Prioridad;
                        break;
                    }
                    console.log('[Error] Por favor escribe exactamente: baja, media o alta.');
                }

                const nuevoReporte = guardarIncidente({
                    titulo: titulo.trim(),
                    reportadoPor: reportadoPor.trim(),
                    prioridad: prioridadValida
                });

                pintarAviso('OK', `¡Reporte registrado con éxito! Código asignado: ${nuevoReporte.id}`);
                break;

            case '2':
                mostrarTablaIncidentes();
                await hacerPregunta('Presiona Enter para regresar al menú...');
                break;

            case '3':
                pintarAviso('INFO', 'Cerrando módulo interactivo en consola. ¡Feliz día!');
                salir = true;
                rl.close();
                break;

            default:
                pintarAviso('ERROR', 'Opción no válida. Ingresa un número del 1 al 3.');
                break;
        }
    }
}

// Iniciar aplicación interactiva
ejecutarSistema();