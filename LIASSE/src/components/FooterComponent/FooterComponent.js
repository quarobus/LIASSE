import React from 'react';
import PropTypes from 'prop-types';
import styles from './FooterComponent.module.scss';

const FooterComponent = () => (
  <div className={styles.FooterComponent} data-testid="FooterComponent">
    FooterComponent Component
  </div>
);

FooterComponent.propTypes = {};

FooterComponent.defaultProps = {};

export default FooterComponent;
