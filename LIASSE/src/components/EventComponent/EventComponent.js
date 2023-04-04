import React from 'react';
import PropTypes from 'prop-types';
import styles from './EventComponent.module.scss';

const EventComponent = () => (
  <div className={styles.EventComponent} data-testid="EventComponent">
    EventComponent Component
  </div>
);

EventComponent.propTypes = {};

EventComponent.defaultProps = {};

export default EventComponent;
