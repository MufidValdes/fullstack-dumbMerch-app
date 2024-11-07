const { MidtransClient } = require('midtrans-node-client');

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MT_SERVER_KEY,
  clientKey: process.env.MT_CLIENT_KEY,
});

export default snap;
