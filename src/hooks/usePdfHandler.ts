/**
 * Hook personalizado para manejar la apertura de PDFs
 * Proporciona funcionalidad centralizada y reutilizable
 */

import { useCallback } from 'react';

interface UsePdfHandlerOptions {
  target?: '_blank' | '_self' | '_parent' | '_top';
  newWindow?: boolean;
}

export const usePdfHandler = (options: UsePdfHandlerOptions = {}) => {
  const { target = '_blank', newWindow = true } = options;

  /**
   * Valida si un PDF existe mediante HEAD request
   */
  const pdfExists = useCallback(async (ruta: string): Promise<boolean> => {
    try {
      const response = await fetch(ruta, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }, []);

  const openPdf = useCallback(
    async (ruta: string, filename?: string) => {
      try {
        // Valida que sea una ruta válida
        if (!ruta || typeof ruta !== 'string') {
          console.error('Ruta de PDF inválida:', ruta);
          return;
        }

        // Verifica si el PDF existe
        const exists = await pdfExists(ruta);
        if (!exists) {
          console.warn('PDF no encontrado:', ruta);
          return;
        }

        // Abre el PDF en nueva pestaña con seguridad mejorada
        const features = newWindow
          ? 'noopener,noreferrer'
          : undefined;
        
        window.open(ruta, target, features);

        // Opcional: Log para analytics
        console.log('PDF abierto:', filename || ruta);
      } catch (error) {
        console.error('Error al abrir PDF:', error);
      }
    },
    [target, newWindow, pdfExists]
  );

  /**
   * Descarga un PDF en lugar de abrirlo
   */
  const downloadPdf = useCallback((ruta: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = ruta;
      link.download = filename || 'documento.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar PDF:', error);
    }
  }, []);

  return { openPdf, downloadPdf };
};

export default usePdfHandler;
