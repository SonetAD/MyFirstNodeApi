/* Name: A http server
Description: This will handle all the request and Response.
Author:Sonet Adhikary
Date:6 sep,2020 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../Handlers/Routehandlers/sampleHandler');
const { notFound } = require('../Handlers/Routehandlers/notfoundRoute');
const env = require('./env');
const crud = require('../lib/data');

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
  const { pathname } = urlParse;
  const regex = /^\/+|\/+$/g;
  const pathName = pathname.replace(regex, '');
  const method = req.method.toLowerCase();
  const { headers } = req;
  const decoder = new StringDecoder('utf-8');
  const reqObj = {
    urlParse,
    method,
    headers,
    decoder,
  };
  const choosenHandler = routes[pathName] ? routes[pathName] : notFound;

  req.on('data', (chunck) => {
    console.log(chunck);
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
