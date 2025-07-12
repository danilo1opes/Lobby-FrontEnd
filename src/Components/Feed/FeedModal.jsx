import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import { PHOTO_GET } from '../../Api';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    if (photo?.id) {
      const { url, options } = PHOTO_GET(photo.id);
      console.log('FeedModal - Requisição:', { url, options });
      request(url, options)
        .then(() => {
          console.log('FeedModal - Resposta:', data);
        })
        .catch((err) => {
          console.error('FeedModal - Erro na requisição:', err);
        });
    } else {
      console.log('FeedModal - Erro: photo.id inválido', photo);
    }
  }, [photo, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && data.photo ? <PhotoContent data={data} /> : null}
    </div>
  );
};

export default FeedModal;
