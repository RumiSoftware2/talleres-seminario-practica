/**
 * Funciones utilitarias para la aplicación
 */

/**
 * Formatea una fecha en formato local
 */
export const formatearFecha = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Trunca un texto a una longitud específica
 */
export const truncarTexto = (texto: string, longitud: number = 100): string => {
  if (texto.length <= longitud) return texto;
  return texto.substring(0, longitud) + '...';
};

/**
 * Valida si una URL es válida
 */
export const esUrlValida = (url: string): boolean => {
  try {
    new URL(url, window.location.origin);
    return true;
  } catch {
    return false;
  }
};

/**
 * Obtiene la extensión de un archivo
 */
export const obtenerExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Convierte un tamaño en bytes a formato legible
 */
export const formatearTamano = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Genera un ID único
 */
export const generarIdUnico = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Agrupa un array por una propiedad
 */
export const agruparPor = <T,>(
  array: T[],
  propiedad: keyof T
): Record<string, T[]> => {
  return array.reduce(
    (acc, item) => {
      const clave = String(item[propiedad]);
      if (!acc[clave]) {
        acc[clave] = [];
      }
      acc[clave].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
};
