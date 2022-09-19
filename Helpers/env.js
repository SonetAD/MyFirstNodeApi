/* Name: Environment variable file
Description: This file will contain all the environment releted config.
Author: Sonet Adhikary
Date: 10 Sep,2022 */

// Module scaffolding object

const env = {};

env.prod = {
  port: 5000,
  name: 'Production',
  passKey: 'prodKey',
};

env.stage = {
  port: 3000,
  name: 'Staging',
  passKey: 'stageKey',
};

// Determined which environment has passed

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'stage';

// Check environment object
const checkEnv = typeof env[currentEnv] === 'object' ? env[currentEnv] : env.stage;

module.exports = checkEnv;
