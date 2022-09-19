/* Name: Routes
Description: Application routes
Author: Sonet Adhikary
Date: 8 Sep,2022 */

// Dependencies
const { sampleHandler } = require('../Handlers/Routehandlers/sampleHandler');
const { userHandler } = require('../Handlers/Routehandlers/UserHandler');

// Module scafforld
const app = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = app;
