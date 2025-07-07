import React from 'react';
import styles from './Footer.module.css';
import Dogs from '../Assets/dogs-footer.svg?react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Lobby. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
