/* Name: Not found handler
Description: This is a function that will handle the not found route
Author: Sonet Adhikary
Date: 8 Sep,2022 */

// Module scaffolding
const app = {};

app.notFound = (reqData, callBack) => {
  callBack(404, { message: 'No page found' });
  console.log(reqData);
};

module.exports = app;
