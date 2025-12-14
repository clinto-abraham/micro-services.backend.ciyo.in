const axios = require("axios");

exports.emit = async (event, payload) => {
  try {
    await axios.post("http://localhost:6000/internal/ws/emit", {
      event,
      payload
    });
  } catch (e) {
    console.error("WS emit failed");
  }
};
