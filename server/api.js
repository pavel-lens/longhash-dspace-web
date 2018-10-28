const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const api = require('./everiTokenApi');
const format = d => JSON.stringify(d, '', 2);

const {
  MASTER_PRIVATE_KEY,
  MASTER_PUBLIC_KEY,
  HOST_PRIVATE_KEY,
  HOST_PUBLIC_KEY,
  RENTEE_PRIVATE_KEY,
  RENTEE_PUBLIC_KEY,
} = process.env;

const pkeyMap = {
  master: MASTER_PUBLIC_KEY,
  host: HOST_PUBLIC_KEY,
  rentee: RENTEE_PUBLIC_KEY,
};

const privateKeyMap = {
  master: MASTER_PRIVATE_KEY,
  host: HOST_PRIVATE_KEY,
  rentee: RENTEE_PRIVATE_KEY,
};

// set network endpoint
const network = {
  host: process.env.EVERITOKEN_HOST,
  port: process.env.EVERITOKEN_PORT,
  protocol: process.env.EVERITOKEN_PROTOCOL,
};

function getPkeyByRole(role) {
  if (Object.keys(pkeyMap).indexOf(role) !== -1) {
    return pkeyMap[role];
  }
  return null;
}

function getPrivateKeyByRole(role) {
  if (Object.keys(privateKeyMap).indexOf(role) !== -1) {
    return privateKeyMap[role];
  }
  return null;
}

router.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
  });
});

router.post('/listTokens', async (req, res) => {
  const { role } = req.body;

  // List all tokens for master, host and rentee
  if (role === 'all') {
    try {
      api.initializeApi(network, MASTER_PRIVATE_KEY);
      const [masterTokens, hostTokens, renteeTokens] = await Promise.all([
        api.listTokens(pkeyMap.master),
        api.listTokens(pkeyMap.host),
        api.listTokens(pkeyMap.rentee),
      ]);

      return res.json({
        error: false,
        payload: {
          master: masterTokens,
          host: hostTokens,
          rentee: renteeTokens,
        },
      });
    } catch (e) {
      return res.json({
        error: true,
        errorMessage: format(e),
      });
    }
  }

  // Get tokens for specific role
  const pkey = getPkeyByRole(role);

  if (!pkey) {
    res.json({
      error: true,
      errorMessage: 'Invalid role. It should be one of: master, host, rentee',
    });
  }

  try {
    api.initializeApi(network, MASTER_PRIVATE_KEY);
    const response = await api.listTokens(pkey);

    return res.json({
      error: false,
      payload: response,
    });
  } catch (e) {
    return res.json({
      error: true,
      errorMessage: format(e),
    });
  }
});

router.post('/issueToken', async (req, res) => {
  const { role, token } = req.body;
  const pkey = getPkeyByRole(role);

  if (!pkey) {
    res.json({
      error: true,
      errorMessage: 'Invalid role. It should be one of: master, host, rentee',
    });
  }

  try {
    const tokenName = `${token}.${uuidv4().slice(0, 8)}`;

    api.initializeApi(network, MASTER_PRIVATE_KEY);
    const response = await api.issueToken(tokenName, pkey);
    // response = await api.transferToken(tokenName, )

    return res.json({
      error: false,
      payload: response,
    });
  } catch (e) {
    return res.json({
      error: true,
      errorMessage: format(e),
    });
  }
});

router.post('/destroyToken', async (req, res) => {
  const { token } = req.body;

  try {
    api.initializeApi(network, HOST_PRIVATE_KEY);
    const response = await api.destroyToken(token);

    return res.json({
      error: false,
      payload: response,
    });
  } catch (e) {
    return res.json({
      error: true,
      errorMessage: format(e),
    });
  }
});

router.post('/transferToken', async (req, res) => {
  const { token, fromPrivateKey, toPkey, message } = req.body;

  try {
    // api.initializeApi(network, MASTER_PRIVATE_KEY);
    api.initializeApi(network, fromPrivateKey);
    const response = await api.transferToken(token, toPkey, message);

    return res.json({
      error: false,
      payload: response,
    });
  } catch (e) {
    return res.json({
      error: true,
      errorMessage: format(e),
    });
  }
});

module.exports = router;
