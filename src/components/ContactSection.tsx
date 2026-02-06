import React from 'react';
import styles from '../styles/ContactSection.module.css';

interface ContactSectionProps {
  link?: string;
  label?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  link = 'https://tu-portfolio.example',
  label = 'Mi portafolio',
}) => {
  return (
    <section className={styles.wrapper} aria-label="Sección de contacto">
      <div className={styles.inner}>
        <div className={styles.left} />
        <div className={styles.content}>
          <h3 className={styles.title}>¿Quieres contactarme?</h3>
          <p className={styles.subtitle}>Visita mi portafolio y escríbeme.</p>
          <a
            className={styles.cta}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
            <span className={styles.ctaIcon}> →</span>
          </a>
        </div>
        <div className={styles.right} />
      </div>
    </section>
  );
};

export default ContactSection;
