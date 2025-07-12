import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const resetUrl = window.location.origin + '/resetar'; // URL base para reset
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: resetUrl,
      });
      console.log('Requisição:', { url, options }); // Depuração
      const { json, response } = await request(url, options);
      if (response && response.ok) {
        console.log('Sucesso:', json); // Exibe o json retornado
      } else {
        console.error('Erro na requisição:', json || response?.statusText); // Log do erro
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data && !error ? (
        <p style={{ color: '#4c1' }}>
          {data.message || 'Email enviado com sucesso!'}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
          {error && <Error error={error} />}
        </form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
