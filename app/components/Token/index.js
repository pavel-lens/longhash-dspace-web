/**
 *
 * Token
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'antd';
import Layout from 'components/Layout';

function Token(props) {
  const { transfering, locked, onClick, onDelete } = props;
  const iconType = locked ? 'lock' : 'unlock';
  const toneColor = locked ? '#eb2f96' : '#52c41a';
  const extra = onDelete ? (
    <Icon
      type="delete"
      shape="circle"
      theme="outlined"
      onClick={onDelete}
      style={{
        color: '#eb2f2f',
        fontSize: '20px',
        verticalAlign: 'text-bottom',
        marginLeft: '6px',
      }}
    />
  ) : (
    <span />
  );

  return (
    <Card title={`Token: ${props.name}`} extra={extra}>
      <a onClick={onClick}>
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
      </a>
    </Card>
  );
}

Token.propTypes = {
  locked: PropTypes.bool,
  transfering: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

Token.defaultProps = {
  locked: false,
  transfering: false,
  name: 'undefined',
  size: 50,
  onClick: () => {},
  onDelete: null,
};

export default Token;
