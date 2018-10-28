/**
 *
 * SuperNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

function SuperNav(props) {
  const { role, onRoleChange } = props;
  const disabledRoleChange = !onRoleChange;

  const renderRole = roleName => {
    if (roleName === role) {
      return <span className={styles.selected}> {roleName} |</span>;
    }
    return (
      <span>
        {' '}
        {!disabledRoleChange && (
          <a href="javascript: void(0);" onClick={() => onRoleChange(roleName)}>
            {roleName}
          </a>
        )}
        {disabledRoleChange && <span>{roleName}</span>} |
      </span>
    );
  };

  return (
    <div className={styles.supernav}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Link to="/">Home</Link> |<Link to="/super-admin"> Super Admin</Link>{' '}
          |<Link to="/host-dashboard"> Host Dashoard</Link> |
          <Link to="/rentee-dashboard"> Rentee Dashoard</Link>
        </div>
        <div className={styles.right}>
          Select role:
          {renderRole('master')}
          {renderRole('host')}
          {renderRole('rentee')}
        </div>
      </div>
    </div>
  );
}

SuperNav.propTypes = {
  role: PropTypes.string,
  onRoleChange: PropTypes.func,
};

export default SuperNav;
