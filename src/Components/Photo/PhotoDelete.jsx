import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import styles from './PhotoDelete.module.css';
import { PHOTO_DELETE } from '../../Api';
import useFetch from '../../Hooks/useFetch';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();
  const { data } = useContext(UserContext);

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) {
        const username =
          localStorage.getItem('username') ||
          JSON.parse(localStorage.getItem('user'))?.username;

        if (username) {
          window.location.href = `/perfil/${username}`;
        } else {
          window.location.href = '/conta';
        }
      }
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
