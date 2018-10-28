/**
 *
 * SuperAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import Layout from 'components/Layout';
import Spacer from 'components/Spacer';
import SuperNav from 'components/SuperNav';

function SuperAdmin() {
  return (
    <div className="supernavPush">
      <SuperNav role="master" />
      <Layout>
        <h1>There is no super-admin in decentralized network</h1>
        <Spacer />
        <Icon type="smile" style={{ fontSize: 100 }} />
        <Spacer />
        <Link to="/">
          <Button size="big" type="primary">
            Go back
          </Button>
        </Link>
      </Layout>
    </div>
  );
}

SuperAdmin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SuperAdmin);
