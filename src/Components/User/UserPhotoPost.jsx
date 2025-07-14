import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { PHOTO_POST } from '../../Api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const personagem = useForm();
  const epoca = useForm();
  const [img, setImg] = React.useState({ preview: null, raw: null });
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      console.log('Resposta completa do servidor:', data);
      if (data.photo) {
        console.log('Dados da foto:', data.photo);
        navigate('/conta');
      }
    }
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!img.raw) {
      console.error('Nenhuma imagem selecionada');
      return;
    }

    console.log('Valores do formulário:', {
      nome: nome.value,
      personagem: personagem.value,
      epoca: epoca.value,
    });

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('personagem', personagem.value);
    formData.append('epoca', epoca.value);

    // Log do FormData para depuração
    for (let pair of formData.entries()) {
      console.log('FormData enviado:', pair[0], pair[1]);
    }

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options).catch((err) => {
      console.error('Erro no upload:', err);
    });
  }

  function handleImgChange({ target }) {
    if (target.files && target.files[0]) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome do Jogo" type="text" name="nome" {...nome} />
        <Input
          label="Nome do Personagem"
          type="text"
          name="personagem"
          {...personagem}
        />
        <Input label="Época do Jogo" type="text" name="epoca" {...epoca} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
        {!img.preview && <p>Selecione uma imagem para pré-visualizar</p>}
      </div>
    </section>
  );
};

export default UserPhotoPost;
