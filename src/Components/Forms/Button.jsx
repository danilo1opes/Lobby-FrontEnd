import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      <span className={styles.button_lg}>
        <span className={styles.button_sl}></span>
        <span className={styles.button_text}>{children}</span>
      </span>
    </button>
  );
};

export default Button;
