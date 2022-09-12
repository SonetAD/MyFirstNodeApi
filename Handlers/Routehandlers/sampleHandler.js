/* Name: Sample handler
Description: This is a function that will handle the sample route
Author: Sonet Adhikary
Date: 8 Sep,2022 */

// Module scaffolding
const app = {};

app.sample = (hhhhhhhhhhhhhhhhhhhreqData, callBack) => {
  callBack(200, { message: 'You are visiting sample page' });
  console.log('reqData');
};

module.exports = app;
