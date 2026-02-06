import React from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  titulo?: string;
  subtitulo?: string;
  logo?: string;
}

/**
 * Componente Header
 * Encabezado profesional de la landing page
 * 
 * Props:
 * - titulo: Título principal
 * - subtitulo: Subtítulo descriptivo
 * - logo: URL de la imagen/logo a mostrar (opcional)
 */
const Header: React.FC<HeaderProps> = ({
  titulo = 'Talleres Seminario Práctica en Aula',
  subtitulo = 'Profesora Nubia Accede a todos los pdfs solicitados para los talleres',
  logo,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          {logo && (
            <div className={styles.logoContainer}>
              <img
                src={logo}
                alt="Logo"
                className={styles.logo}
              />
            </div>
          )}
          <div className={styles.content}>
            <h1 className={styles.titulo}>{titulo}</h1>
            <p className={styles.subtitulo}>{subtitulo}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
