/* Name: Routes
Description: Application routes
Author: Sonet Adhikary
Date: 8 Sep,2022 */

// Dependencies
const { sampleHandler } = require('../Handlers/Routehandlers/sampleHandler');

// Module scafforld
const app = {
  sample: sampleHandler,
};

module.exports = app;
