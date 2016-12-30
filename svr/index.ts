import express = require('express');
import path = require('path');
import app from './app';

// normalize path becuase sendfile does not like .. in paths
const dist = path.normalize(app.get('public'));
const port = app.get('port');

app.use(express.static(dist));
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, '/index.html')); // load our index.html file
});

const server = app.listen(port);

server.on('listening', () => {
  console.log(`Feathers application started on ${app.get('host')}:${port}`);
});

// log errors
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('uncaughtException', function (err) {
  console.error(err);
});

this.app = app;
