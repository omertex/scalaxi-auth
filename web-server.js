const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const webServerConfig = require('./config');

const auth = require('./app/controllers/auth');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    httpServer = http.createServer(app);

    app.post('/login', (req, res) => {
      auth.login(req, res);
    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server is listening to the port: ${webServerConfig.port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  initialize, close
}