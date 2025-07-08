import React from 'react';
import styles from './Footer.module.css';
import Gamer from '../Assets/gamer-footer.svg?react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Gamer />
      <p>Lobby. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
