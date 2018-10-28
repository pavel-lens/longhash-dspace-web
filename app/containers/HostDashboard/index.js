/**
 *
 * HostDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import keys from 'data/keys';
import styles from './styles.scss';

const offices = [
  {
    id: 1,
    slug: 'r24.obr',
    name: 'Rent24 Oberwallstraße',
    address: 'Oberwallstraße 6, Berlin',
  },
  {
    id: 2,
    slug: 'r24.pts',
    name: 'Rent24 Potsdamer platz',
    address: 'Potsdamer platz 5, Berlin',
  },
  {
    id: 3,
    slug: 'ww.pts',
    name: 'WeWork Potsdamer platz',
    address: 'Potsdamer platz 3, Berlin',
  },
];

const selectOfficeById = id => offices.find(o => o.id === id);

/* eslint-disable react/prefer-stateless-function */
export class HostDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      role: 'host',
      tokens: {
        master: [],
        host: [],
        rentee: [],
      },
      selectedOffice: false,
      transferingToken: null,
      loadingIssueToken: false,
    };
  }

  componentDidMount() {
    this.handleLoadTokens();
  }

  handleLoadTokens = () => {
    this.setState({
      loading: true,
    });

    request
      .post('/api/listTokens', { role: 'all' })
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

  handleIssueToken = () => {
    const { selectedOffice } = this.state;
    const office = selectOfficeById(selectedOffice);
    const tokenName = office.slug;
    this.setState({
      loadingIssueToken: true,
    });

    request
      .post('/api/issueToken', { role: 'host', token: tokenName })
      .then(res => {
        console.log('API::listTokens TX', res);

        request.post('/api/listTokens', { role: 'all' }).then(response => {
          console.log('API::listTokens TX', response);
          this.setState({
            tokens: response.payload,
            loadingIssueToken: false,
          });
        });
      })
      .catch(err => {
        console.error('API::TX error', err);
      });
  };

  handleSelectOffice = officeId => {
    this.setState({
      selectedOffice: officeId,
    });
    // this.handleLoadTokens();
  };

  handleTokenTransfer = (token, fromPrivateKey, toPkey) => {
    console.log('Trasnfering token', token, 'to', toPkey);
    this.setState({
      transferingToken: token,
    });

    request
      .post('/api/transferToken', { token, fromPrivateKey, toPkey })
      .then(res => {
        console.log('API::transferToken TX', res);

        request.post('/api/listTokens', { role: 'all' }).then(response => {
          console.log('API::listTokens TX', response);
          this.setState({
            tokens: response.payload,
            transferingToken: null,
          });
        });
      })
      .catch(err => {
        console.error('API::transferToken TX Error', err);
        this.setState({
          transferingToken: null,
        });
      });
  };

  renderOffices() {
    return offices.map(office => (
      <Col span="8" key={office.id}>
        <a onClick={() => this.handleSelectOffice(office.id)}>
          <Card title={office.name}>
            <Icon type="home" style={{ fontSize: 50 }} />
            <Spacer size="small" />
            {office.address}
          </Card>
        </a>
      </Col>
    ));
  }

  renderTokens(office, owner, transferTo) {
    const { tokens, transferingToken } = this.state;
    const propertyTokens = tokens[owner].filter(token =>
      token.name.startsWith(office.slug),
    );
    const tokenNodes = propertyTokens.map(token => (
      <Token
        key={`token-${token.domain}-${token.name}`}
        locked={owner === 'host'}
        name={token.name}
        transfering={transferingToken === token.name}
        onClick={() =>
          this.handleTokenTransfer(
            token.name,
            keys[owner].private,
            keys[transferTo].public,
          )
        }
      />
    ));

    return tokenNodes;
  }

  render() {
    const { loadingIssueToken, role, selectedOffice } = this.state;
    const officeNodes = this.renderOffices();
    const office = selectOfficeById(selectedOffice);

    return (
      <div className="supernavPush">
        <SuperNav role={role} />
        <h1 className={styles.title}>Host Dashboard</h1>
        <Identity address={keys.host.public} />
        <Spacer />

        {!selectedOffice && (
          <div>
            <h3>Your offices</h3>
            <Row gutter={32}>{officeNodes}</Row>
          </div>
        )}
        {selectedOffice && (
          <div>
            <Button onClick={() => this.handleSelectOffice(false)}>
              Back to Offices
            </Button>{' '}
            <Button
              type="primary"
              loading={loadingIssueToken}
              onClick={() => this.handleIssueToken()}
            >
              Issue new Token
            </Button>
            <Spacer />
            <h2>Office: {office.name}</h2>
            <h4>Address: {office.address}</h4>
            <Spacer size="large" />
            <Row gutter={64}>
              <Col span="12">
                <Layout padding>
                  <h2>Host: Available tokens</h2>
                  <h4>{keys.host.public}</h4>
                  {this.renderTokens(office, 'host', 'rentee')}
                </Layout>
              </Col>
              <Col span="12">
                <Layout padding>
                  <h2>Rentee: Assigned tokens</h2>
                  <h4>{keys.rentee.public}</h4>
                  {this.renderTokens(office, 'rentee', 'host')}
                </Layout>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

HostDashboard.propTypes = {
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

export default compose(withConnect)(HostDashboard);
