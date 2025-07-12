import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../Helper/Image';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  console.log('FeedPhotosItem - Photo:', {
    id: photo.id,
    src: photo.src,
    title: photo.title,
  });

  if (!photo.src || photo.src === '' || photo.src.includes('undefined')) {
    return null;
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title || 'Foto'} />
      <span className={styles.visualizacao}>{photo.acessos || 0}</span>
    </li>
  );
};

export default FeedPhotosItem;
