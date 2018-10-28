import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

function Spacer(props) {
  const classes = cn({
    [styles.spacer__tiny]: props.size === 'tiny',
    [styles.spacer__small]: props.size === 'small',
    [styles.spacer__normal]: props.size === 'normal',
    [styles.spacer__large]: props.size === 'large',
    [styles.spacer__huge]: props.size === 'huge',
  });

  return <div className={classes} />;
}

Spacer.propTypes = {
  size: PropTypes.string,
};

Spacer.defaultProps = {
  size: 'normal',
};

export default Spacer;
