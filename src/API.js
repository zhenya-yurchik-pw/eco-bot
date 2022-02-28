const fetch = require('cross-fetch');

module.exports = {
  async getData() {
    try {
      const res = await fetch(`https://api.thingspeak.com/channels/1379996/feeds.json?results=2`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log('e', e);
    }
  },
};
