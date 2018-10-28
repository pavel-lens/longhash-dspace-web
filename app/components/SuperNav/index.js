/**
 *
 * SuperNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function SuperNav(props) {
  const { role, onRoleChange } = props;

  const renderRole = roleName => {
    if (roleName === role) {
      return <span className={styles.selected}> {roleName} |</span>;
    }
    return (
      <span>
        {' '}
        <a href="javascript: void(0);" onClick={() => onRoleChange(roleName)}>
          {roleName}
        </a>{' '}
        |
      </span>
    );
  };

  return (
    <div className={styles.supernav}>
      <div className={styles.wrapper}>
        Select role:
        {renderRole('master')}
        {renderRole('host')}
        {renderRole('rentee')}
      </div>
    </div>
  );
}

SuperNav.propTypes = {
  role: PropTypes.string,
  onRoleChange: PropTypes.func,
};

export default SuperNav;
