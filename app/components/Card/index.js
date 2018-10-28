import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

import styles from './styles.scss';

function Card(props) {
  return (
    <AntCard {...props}>
      <div className={styles.card}>{props.children}</div>
    </AntCard>
  );
}

Card.propTypes = {
  children: PropTypes.array,
};

export default Card;
