/**
 *
 * Layout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

function Layout(props) {
  const classes = cn(styles.wrapper, {
    [styles.wrapper_padding]: props.padding === true,
    [styles.wrapper_vertical]: props.horizontal !== true,
    [styles.wrapper_horizontal]: props.horizontal === true,
  });

  return <div className={classes}>{props.children}</div>;
}

Layout.propTypes = {
  padding: PropTypes.bool,
  horizontal: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  padding: true,
  horizontal: false,
};

export default Layout;
