/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Row, Col } from 'antd';
import Card from 'components/Card';
import SuperNav from 'components/SuperNav';
import * as request from 'utils/request';
import styles from './styles.scss';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      role: 'master',
      tokens: [],
      loadingTokens: false,
    };
  }

  componentDidMount() {
    const { role } = this.state;
    this.handleRoleChange(role);
  }

  handleRoleChange = role => {
    this.setState({
      role,
      loadingTokens: true,
    });

    request
      .post('/api/listTokens', { role })
      .then(response => {
        this.setState({
          tokens: response.payload || [],
          loadingTokens: false,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { role, tokens, loadingTokens } = this.state;

    return (
      <div className="supernavPush">
        <SuperNav role={role} onRoleChange={this.handleRoleChange} />
        <h1>DSpace - Decentralized Shared Office rental</h1>
        <div>
          List of {role} tokens:
          <pre>
            {!loadingTokens && <code>{JSON.stringify(tokens)}</code>}
            {loadingTokens && <Icon type="loading" />}
          </pre>
        </div>
        <Row gutter={32}>
          <Col span="8">
            <Link to="/super-admin">
              <Card title="Super Admin">
                <Icon
                  type="setting"
                  theme="twoTone"
                  style={{ fontSize: 100 }}
                />
              </Card>
            </Link>
          </Col>
          <Col span="8">
            <Link to="/host-dashboard">
              <Card title="Host Dashboard">
                <Icon type="home" theme="twoTone" style={{ fontSize: 100 }} />
              </Card>
            </Link>
          </Col>
          <Col span="8">
            <Link to="rentee-dashboard">
              <Card title="Rentee Dashboard">
                <Icon type="mobile" theme="twoTone" style={{ fontSize: 100 }} />
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
