/* Name: A http server
Description: This will handle all the request and Response.
Author:Sonet Adhikary
Date:6 sep,2020 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const utils = require('./util');
const routes = require('./routes');
const { notFound } = require('../Handlers/Routehandlers/notfoundRoute');
const env = require('./env');
const crud = require('../lib/data');
const { readData } = require('../lib/data');

// Module scaffold object
const app = {};

// =Functions declaration

// Create server
app.createServer = () => {
  const server = http.createServer(onConnection);
  server.listen(env.port, () => {
    console.log(`${env.name} MODE: Listenning to port:${env.port}`);
  });
};

// Handle req and res

function onConnection(req, res) {
  const urlParse = url.parse(req.url, true);
  const { query } = urlParse;
  const { pathname } = urlParse;
  const regex = /^\/+|\/+$/g;
  const pathName = pathname.replace(regex, '');
  const method = req.method.toLowerCase();
  const { headers } = req;
  const decoder = new StringDecoder('utf-8');
  let realData = '';
  const reqObj = {
    urlParse,
    method,
    headers,
    query,
  };
  const choosenHandler = routes[pathName] ? routes[pathName] : notFound;
  res.setHeader('Content-Type', 'application/json');

  req.on('data', (chunck) => {
    realData += decoder.write(chunck);
  });

  req.on('end', () => {
    realData += decoder.end();
    reqObj.body = utils.jsonParser(realData);
    choosenHandler(reqObj, (status, payLoad) => {
      const statusCode = typeof status === 'number' ? status : 500;
      const payLoadData = typeof payLoad === 'object' ? payLoad : {};
      const payLoadString = JSON.stringify(payLoadData);
      res.writeHead(statusCode);

      res.end(payLoadString);
    });
  });
}

module.exports = app;
