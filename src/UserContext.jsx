import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    console.log('getUser - Requisição:', { url, options });
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('getUser - Resposta:', json);
    if (response.ok) {
      setData(json);
      setLogin(true);
    } else {
      throw new Error(json?.error || `Erro: ${response.statusText}`);
    }
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      console.log('userLogin - Requisição:', { url, options });
      const tokenRes = await fetch(url, options);
      const tokenJson = await tokenRes.json();
      console.log('userLogin - Resposta:', tokenJson);
      if (!tokenRes.ok)
        throw new Error(tokenJson?.error || `Erro: ${tokenRes.statusText}`);
      const { token } = tokenJson;
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          console.log('autoLogin - Requisição:', { url, options });
          const response = await fetch(url, options);
          const json = await response.json();
          console.log('autoLogin - Resposta:', json);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
