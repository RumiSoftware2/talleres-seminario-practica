import React, { useCallback } from 'react';
import Header from '../components/Header';
import TallerList from '../components/TallerList';
import { talleres } from '../data/talleres';
import styles from '../styles/Home.module.css';
import ContactSection from '../components/ContactSection';

/**
 * Página Home/Landing
 * Componente principal que orquesta la visualización de talleres
 */
const Home: React.FC = () => {
  /**
   * Maneja la apertura de PDFs
   * Valida que el PDF existe antes de abrirlo en una nueva pestaña
   */
  const handleOpenPdf = useCallback(async (ruta: string) => {
    try {
      // Valida que sea una ruta válida
      if (!ruta || typeof ruta !== 'string') {
        return;
      }

      // Verifica si el PDF existe
      const response = await fetch(ruta, { method: 'HEAD' });
      if (!response.ok) {
        console.warn('PDF no encontrado:', ruta);
        return;
      }

      // Abre el PDF en nueva pestaña
      window.open(ruta, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // Si la ruta no existe, simplemente no hace nada
      console.warn('No se pudo abrir el PDF:', ruta);
    }
  }, []);

  return (
    <div className={styles.page}>
      <Header
        titulo="Talleres Seminario Práctica en Aula "
        subtitulo="Profesora Nubia , Accede a todos los pdfs solicitados para los talleres"
        logo="/logo.png"
      />
      <main className={styles.main}>
        <TallerList
          talleres={talleres}
          onOpenPdf={handleOpenPdf}
          agruparPorUnidad={true}
        />
      </main>
      <ContactSection link="https://portafoliosmendo.netlify.app" label="Mi portafolio" />
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2026 Plataforma Académica. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
