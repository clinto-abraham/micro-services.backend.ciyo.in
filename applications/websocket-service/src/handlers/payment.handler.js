"use strict";

function handlePayment(ws, data) {
  ws.send(JSON.stringify(data));
}

module.exports = { handlePayment };
