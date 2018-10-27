const EVT = require('evtjs');
const DOMAIN = 'dspace';

const format = d => JSON.stringify(d, '', 2);

let api;

function initializeApi(network, privateKey) {
  // get APICaller instance
  api = EVT({
    // keyProvider should be string of private key (aka. wit, can generate from everiSigner)
    // you can also pass a function that return that string (or even Promise<string> for a async function)
    endpoint: network,
    keyProvider: privateKey,
  });

  return api;
}

async function listTokens(pkey) {
  return api.getOwnedTokens(pkey);
}

async function issueToken(tokenName, ownerPkey) {
  const action = new EVT.EvtAction('issuetoken', {
    domain: DOMAIN,
    names: [tokenName],
    owner: [ownerPkey],
  });

  return pushTransaction(action);
}

async function destroyToken(tokenName) {
  const action = new EVT.EvtAction('destroytoken', {
    domain: DOMAIN,
    name: tokenName,
  });

  return pushTransaction(action);
}

async function transferToken(tokenName, toPkey, message = '') {
  const action = new EVT.EvtAction('transfer', {
    domain: DOMAIN,
    name: tokenName,
    to: [toPkey],
    memo: message,
  });

  return pushTransaction(action);
}

async function pushTransaction(action) {
  let response;
  try {
    response = await api.pushTransaction({ maxCharge: 10000 }, action);
    console.log(`TX: ${format(response)}`);
  } catch (e) {
    console.error(`TX ERROR: ${format(e)}`);
  }

  return response;
}

module.exports = {
  initializeApi,
  listTokens,
  issueToken,
  destroyToken,
  transferToken,
  pushTransaction,
};
