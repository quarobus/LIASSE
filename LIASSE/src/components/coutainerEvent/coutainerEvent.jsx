import React from 'react';
import styles from './coutainer.module.scss';
import Event from '../EventComponent/event';
const CoutainerEvent = () => {
  return (
    <div className={styles.root}>
      <Event />
    </div>
  );
};

export default CoutainerEvent;
