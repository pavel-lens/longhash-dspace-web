/**
 *
 * Identity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Identity(props) {
  return <h5>Public Key: {props.address}</h5>;
}

Identity.propTypes = {
  address: PropTypes.string,
};

export default Identity;
