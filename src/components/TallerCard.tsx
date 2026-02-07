import React from 'react';
import type { Taller } from '../data/talleres';
import styles from '../styles/TallerCard.module.css';

interface TallerCardProps {
  taller: Taller;
  onOpen: (ruta: string) => void;
  isDestacado?: boolean;
}

/**
 * Componente TallerCard
 * Tarjeta reutilizable que muestra la información de un taller
 * Permite abrir el PDF en una nueva pestaña
 */
const TallerCard: React.FC<TallerCardProps> = ({ taller, onOpen, isDestacado = false }) => {
  const handleClick = () => {
    onOpen(taller.ruta);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClick();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${isDestacado ? styles.cardActive : ''}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      data-taller-id={taller.id}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{taller.nombre}</h3>
        {taller.unidad && (
          <span className={styles.badge}>{taller.unidad}</span>
        )}
      </div>

      <p className={styles.cardDescription}>{taller.descripcion}</p>

      <div className={styles.cardMeta}>
        {taller.semana && (
          <span className={styles.metaItem}>
            📅 Semana {taller.semana}
          </span>
        )}
        {taller.fechaPublicacion && (
          <span className={styles.metaItem}>
            📆 {taller.fechaPublicacion}
          </span>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button
          className={styles.button}
          onClick={handleButtonClick}
          aria-label={`Descargar ${taller.nombre}`}
        >
          <span className={styles.buttonIcon}>📄</span>
          Ver PDF
        </button>
      </div>
    </div>
  );
};

export default TallerCard;
