import React from 'react';
import styles from './Image.module.css';

const Image = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    console.log('Imagem carregada:', props.src);
    setSkeleton(false);
    target.style.opacity = 1;
  }

  function handleError() {
    console.error('Erro ao carregar imagem:', props.src);
    setSkeleton(false);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img
        onLoad={handleLoad}
        onError={handleError}
        className={styles.img}
        alt={alt}
        {...props}
      />
    </div>
  );
};

export default Image;
