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
  const { locked } = props;
  const iconType = locked ? 'lock' : 'unlock';
  const toneColor = locked ? '#eb2f96' : '#52c41a';

  return (
    <Card title={`Token: ${props.name}`}>
      <Layout padding={false}>
        <Icon
          type={iconType}
          theme="twoTone"
          twoToneColor={toneColor}
          style={{ fontSize: props.size }}
        />
      </Layout>
    </Card>
  );
}

Token.propTypes = {
  locked: PropTypes.bool,
  size: PropTypes.number,
};

Token.defaultProps = {
  locked: false,
  size: 50,
};

export default Token;
