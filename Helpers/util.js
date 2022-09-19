/* Name:
Description: All the utilities function will be defined here
Author: Sonet Adhikary
Date: 18 Sep,2022 */

// Dependencies
const { createHmac } = require('crypto');
const env = require('./env');

// Module scaffolding
const app = {};

// Parse json string to object
app.jsonParser = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

// Hash string
app.hash = (str) => {
  if (typeof (str) === 'string' && str.length > 0) {
    return createHmac('sha256', env.passKey).update(str).digest('hex');
  }

  return false;
};

module.exports = app;
