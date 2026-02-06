import React, { useMemo } from 'react';
import type { Taller } from '../data/talleres';
import TallerCard from './TallerCard';
import styles from '../styles/TallerList.module.css';

interface TallerListProps {
  talleres: Taller[];
  onOpenPdf: (ruta: string) => void;
  agruparPorUnidad?: boolean;
}

/**
 * Componente TallerList
 * Renderiza dinámicamente una lista de talleres en formato grid
 * Puede agrupar por unidad si se especifica
 */
const TallerList: React.FC<TallerListProps> = ({
  talleres,
  onOpenPdf,
  agruparPorUnidad = false,
}) => {
  const talleresAgrupados = useMemo(() => {
    if (!agruparPorUnidad) {
      return { 'Todos los talleres': talleres };
    }

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
  }, [talleres, agruparPorUnidad]);

  if (talleres.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No hay talleres disponibles</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {Object.entries(talleresAgrupados).map(([unidad, tllrs]) => (
        <section key={unidad} className={styles.section}>
          {agruparPorUnidad && (
            <h2 className={styles.sectionTitle}>{unidad}</h2>
          )}
          <div className={styles.grid}>
            {tllrs.map((taller) => (
              <TallerCard
                key={taller.id}
                taller={taller}
                onOpen={onOpenPdf}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TallerList;
