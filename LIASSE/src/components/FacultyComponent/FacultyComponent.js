import React from 'react';
import PropTypes from 'prop-types';
import styles from './FacultyComponent.module.scss';

const FacultyComponent = () => (
  <div className={styles.FacultyComponent} data-testid="FacultyComponent">
    FacultyComponent Component
  </div>
);

FacultyComponent.propTypes = {};

FacultyComponent.defaultProps = {};

export default FacultyComponent;
