const request = require('request-promise-native');
const ipFetchUrl = 'https://api.ipify.org?format=json';
const geoIpAPIKey = '33e7bc70-a611-11ec-b233-d7bb14e16151';

const fetchMyIP = function() {
  return request(ipFetchUrl);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}?apikey=${geoIpAPIKey}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};


module.exports = {nextISSTimesForMyLocation};