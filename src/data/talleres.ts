/**
 * Configuración de Talleres Académicos
 * 
 * Estructura centralizada para gestionar todos los talleres.
 * Para agregar un nuevo taller:
 * 1. Sube el PDF a public/pdfs/
 * 2. Agrega un nuevo objeto aquí con id único, nombre y ruta
 */

export interface Taller {
  id: string;
  nombre: string;
  descripcion: string;
  ruta: string;
  unidad?: string;
  semana?: number;
  fechaPublicacion?: string;
}

export const talleres: Taller[] = [

    {
    id: 'taller-01',
    nombre: '1. Taller Experiencia Tatiana',
    descripcion: 'Despues de conocer la experiencia de la profesora Tatiana,doy aconocer mis aprendizajes.',
    ruta: '/pdfs/Taller_Tatiana__Sebastian_Mendoza.pdf',
    unidad: 'Talleres 2026-1',
    semana: 1,
    fechaPublicacion: '06-02-2026',
  },    
  
  {
    id: 'taller-02',
    nombre: ' 2. Taller Syllabus',
    descripcion: 'Respuesta a preguntas sobre ser, hacer y saber del profesor de matemáticas usando el capitulo 15 del libro del DIE (Aspectos esenciales en la constitución de la identidad del profesor de matemáticas) y el documento del Syllabus',
    ruta: '/pdfs/taller_syllabus_Sebastian_Mendoza.pdf',
    unidad: 'Talleres 2026-1',
    semana: 1,
    fechaPublicacion: '07-02-2026',
  },
  {
  
    id: 'taller-03',
    nombre: 'Taller PreImpresos Estudiantes',
    descripcion: 'Esenarios para la docencia matemática, con base en los preimpresos de estudiantes.',
    ruta: '/pdfs/taller_preImpresos_Sebastian_Mendoza.pdf',
    unidad: 'Talleres 2026-1',
    semana: 1,
    fechaPublicacion: '10/02/2026',
  },
  /**
    
  {
  
    id: 'taller-03',
    nombre: 'Componentes Reutilizables',
    descripcion: 'Props, composición y patrones de diseño',
    ruta: '/pdfs/taller-03-componentes.pdf',
    unidad: 'Componentes',
    semana: 3,
    fechaPublicacion: '2026-02-15',
  },
  {
    id: 'taller-04',
    nombre: 'Estilos CSS en React',
    descripcion: 'CSS Modules, Tailwind y styled-components',
    ruta: '/pdfs/taller-04-estilos.pdf',
    unidad: 'Estilos',
    semana: 4,
    fechaPublicacion: '2026-02-22',
  },
  {
    id: 'taller-05',
    nombre: 'Consumo de APIs REST',
    descripcion: 'Fetch, axios y manejo de datos asíncronos',
    ruta: '/pdfs/taller-05-apis.pdf',
    unidad: 'Backend Integration',
    semana: 5,
    fechaPublicacion: '2026-03-01',
  },
  */
];

/**
 * Función auxiliar para obtener un taller por ID
 */
export const obtenerTallerPorId = (id: string): Taller | undefined => {
  return talleres.find((taller) => taller.id === id);
};

/**
 * Función auxiliar para agrupar talleres por unidad
 */
export const agruparPorUnidad = (): Record<string, Taller[]> => {
  return talleres.reduce(
    (acc, taller) => {
      const unidad = taller.unidad || 'Sin unidad';
      if (!acc[unidad]) {
        acc[unidad] = [];
      }
      acc[unidad].push(taller);
      return acc;
    },
    {} as Record<string, Taller[]>
  );
};
