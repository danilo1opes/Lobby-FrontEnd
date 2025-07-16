import React from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import styles from './StatsCards.module.css';

const StatsCards = ({ stats }) => {
  const { total, average, totalPhotos, mostAccessed } = stats;

  return (
    <>
      {/* Cards de estatísticas */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <h3>Total de Acessos</h3>
          <p className={styles.statNumber}>{total}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Fotos Postadas</h3>
          <p className={styles.statNumber}>{totalPhotos}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Média de Acessos</h3>
          <p className={styles.statNumber}>{average}</p>
        </div>
      </div>

      {/* Foto mais acessada */}
      {mostAccessed && (
        <div className={styles.topPhoto}>
          <h3>
            <FaPhotoVideo /> Foto Mais Acessada
          </h3>
          <p className={styles.photoTitle}>{mostAccessed.title}</p>
          <p className={styles.photoAccess}>{mostAccessed.acessos} acessos</p>
        </div>
      )}
    </>
  );
};

export default StatsCards;
