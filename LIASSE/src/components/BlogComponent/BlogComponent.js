import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogComponent.module.scss';

const BlogComponent = () => (
  <div className={styles.BlogComponent} data-testid="BlogComponent">
    BlogComponent Component
  </div>
);

BlogComponent.propTypes = {};

BlogComponent.defaultProps = {};

export default BlogComponent;
