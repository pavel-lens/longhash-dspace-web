/**
 *
 * Token
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import Layout from 'components/Layout';

function Token(props) {
  const { transfering, locked } = props;
  const iconType = locked ? 'lock' : 'unlock';
  const toneColor = locked ? '#eb2f96' : '#52c41a';

  return (
    <a onClick={props.onClick}>
      <Card title={`Token: ${props.name}`}>
        <Layout padding={false}>
          {!transfering && (
            <Icon
              type={iconType}
              theme="twoTone"
              twoToneColor={toneColor}
              style={{ fontSize: props.size }}
            />
          )}
          {transfering && (
            <Icon type="loading" style={{ fontSize: props.size }} />
          )}
        </Layout>
      </Card>
    </a>
  );
}

Token.propTypes = {
  locked: PropTypes.bool,
  transfering: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

Token.defaultProps = {
  locked: false,
  transfering: false,
  name: 'undefined',
  size: 50,
  onClick: () => {},
};

export default Token;
