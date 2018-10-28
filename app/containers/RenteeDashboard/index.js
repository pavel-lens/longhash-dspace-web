/**
 *
 * RenteeDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Icon, Row, Col } from 'antd';
import Card from 'components/Card';
import Layout from 'components/Layout';
import Identity from 'components/Identity';
import Spacer from 'components/Spacer';
import SuperNav from 'components/SuperNav';
import Token from 'components/Token';
import * as request from 'utils/request';
import offices from 'data/offices';
import keys from 'data/keys';
import styles from './styles.scss';

// const selectOfficeById = id => offices.find(o => o.id === id);
const getOfficeSlug = str =>
  str
    .split('.')
    .slice(0, -1)
    .join('.');

const selectOfficeBySlug = slug =>
  offices.find(o => o.slug === slug || o.alias === slug);

const createOfficeTokenMap = tokens => {
  const officeTokenMap = {};
  tokens.forEach(token => {
    const { slug } = selectOfficeBySlug(getOfficeSlug(token.name));
    if (!officeTokenMap[slug]) {
      officeTokenMap[slug] = [];
    }
    officeTokenMap[slug].push(token);
  });
  console.log('officeTokenMap', officeTokenMap);
  return officeTokenMap;
};

/* eslint-disable react/prefer-stateless-function */
export class RenteeDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      role: 'rentee',
      tokens: [],
    };
  }

  componentDidMount() {
    this.handleLoadTokens();
  }

  handleLoadTokens = () => {
    const { role } = this.state;
    this.setState({
      loading: true,
    });

    request
      .post('/api/listTokens', { role })
      .then(response => {
        console.log('API::listTokens TX', response);
        this.setState({
          tokens: response.payload,
          loading: false,
        });
      })
      .catch(err => {
        console.error('API::listTokens TX error', err);
      });
  };

  renderOfficeTokens() {
    const { tokens } = this.state;
    const officeTokenMap = createOfficeTokenMap(tokens);

    const officeNodes = Object.keys(officeTokenMap).map(slug => {
      const office = selectOfficeBySlug(slug);
      const officeTokens = officeTokenMap[slug];
      const cardTitle = (
        <span>
          <Icon type="home" style={{ fontSize: 14, display: 'inline-grid' }} />{' '}
          {office.name}
        </span>
      );
      return (
        <Col span={8}>
          <Card title={cardTitle}>
            Address: {office.address}
            <Spacer size="small" />
            {officeTokens.map(token => (
              <Token name={token.name} size={32} />
            ))}
          </Card>
        </Col>
      );
    });

    return officeNodes;
  }

  render() {
    const { loading, role } = this.state;

    return (
      <div className="supernavPush">
        <SuperNav role={role} />
        <h1 className={styles.title}>Rentee Dashboard</h1>
        <Identity address={keys.rentee.public} />
        <Spacer />

        {loading && (
          <Layout>
            <Icon type="loading" style={{ fontSize: 100 }} /> Loading tokens to
            access offices..
          </Layout>
        )}
        {!loading && <Row gutter={32}>{this.renderOfficeTokens()}</Row>}
      </div>
    );
  }
}

RenteeDashboard.propTypes = {
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

export default compose(withConnect)(RenteeDashboard);
