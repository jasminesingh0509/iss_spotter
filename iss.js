const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      console.log(error);
      callback(error, null);
      console.log(body);
    } else {
      const data = JSON.parse(body);
      callback(null, data['ip']);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

      
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;

    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      const data = JSON.parse(body);
      let longAndLat = {};
      longAndLat.latitude = data['data']['latitude'];
      longAndLat.longitude = data['data']['longitude'];
      callback(null, longAndLat);
    }
  });
};





// const request = require("request");
//request("https://api.ipify.org/?format=json", 
//   (error, response, body) => {
//     console.log("error:", error); // Print the error if one occurred
//     console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//     console.log("body:", body); // Print the HTML for the Google homepage.

//     const data = JSON.parse(body);

//     console.log(body);

//   }
//   );
// //);
//const fetchMyIP = function(callback) { 
//   // use request to fetch IP address from JSON API
// }










module.exports = { fetchMyIP, fetchCoordsByIP };