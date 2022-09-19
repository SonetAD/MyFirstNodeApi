/* Name: User Handler
Description: This will handle the user route
Author: Sonet Adhikary
Date: 17 Sep,2022 */

// Dependencies
const crud = require('../../lib/data');
const fsHandler = require('../../lib/data');
const util = require('../../Helpers/util');

// Module scaffolding
const app = {};
const handlers = {};

app.userHandler = (reqData, callBack) => {
  const acceptedMethods = ['get', 'post', 'put', 'delete'];

  if (acceptedMethods.indexOf(reqData.method.toLowerCase()) > -1) {
    handlers[reqData.method.toLowerCase()](reqData, callBack);
  } else {
    callBack(405, { message: 'Method not allowed!' });
  }
};

handlers.get = (reqData, callBack) => {
  // Check the phone number is vallied
  const phoneNumber = typeof (reqData.query.phonenumber) === 'string' && reqData.query.phonenumber.trim().length === 11 ? reqData.query.phonenumber : null;

  if (phoneNumber) {
    // Look up the user
    crud.readData('users', phoneNumber, (err, user) => {
      if (!err) {
        const userObj = util.jsonParser(user);
        delete userObj.password;
        callBack(200, userObj);
      } else {
        callBack(404, { error: 'Requested user was not found' });
      }
    });
  } else {
    callBack(404, { error: 'Requested user was not found' });
  }
};

handlers.post = (reqData, callBack) => {
  const firstName = typeof (reqData.body.firstname) === 'string' && reqData.body.firstname.trim().length > 0 ? reqData.body.firstname : null;

  const lastName = typeof (reqData.body.lastname) === 'string' && reqData.body.lastname.trim().length > 0 ? reqData.body.lastname : null;

  const phoneNumber = typeof (reqData.body.phonenumber) === 'string' && reqData.body.phonenumber.trim().length === 11 ? reqData.body.phonenumber : null;

  const password = typeof (reqData.body.password) === 'string' && reqData.body.password.trim().length > 4 ? reqData.body.password : null;

  const tosAgreement = typeof (reqData.body.tosAgreement) === 'boolean' ? reqData.body.tosAgreement : null;

  if (firstName && lastName && phoneNumber && tosAgreement) {
    // Make sure that the user doesn't already exist
    crud.readData('users', phoneNumber, (err, data) => {
      if (err) {
        const userObj = {
          firstName,
          lastName,
          phoneNumber,
          tosAgreement,
          password: util.hash(password),
        };
        // Store the user to database
        crud.writeData('users', phoneNumber, userObj, (err2) => {
          if (!err2) {
            callBack(200, { message: 'User was created sucessfully' });
          } else {
            callBack(500, { error: 'Could not create user' });
          }
        });
      } else {
        callBack(500, { error: 'There was a problem creating new user' });
      }
    });
  } else {
    callBack(400, { error: 'You have a problem in your request' });
  }
};

handlers.put = (reqData, callBack) => {

};

handlers.delete = (reqData, callBack) => {};

module.exports = app;
