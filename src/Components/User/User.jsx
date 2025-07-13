import React from 'react';
import UserHeader from './UserHeader';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';
import { UserContext } from '../../UserContext';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

const User = () => {
  const { data } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (data && data.username && location.pathname === '/conta') {
      console.log('Redirecionando de /conta para /', data.username);
      navigate(`/${data.username}`, { replace: true });
    }
  }, [data, navigate, location.pathname]);

  return (
    <section className="container">
      <Head title={data?.username || 'Minha Conta'} />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data?.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
