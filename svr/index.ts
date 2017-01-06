import express = require('express');
import path = require('path');
import app from './app';

// normalize path becuase sendfile does not like .. in paths
const dist = path.normalize(app.get('public'));
const port = process.env.PORT || 8080;

app.use(express.static(dist));

// load our angular app for all paths
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, '/index.html'));
});

const server = app.listen(port);

server.on('listening', () => {
  console.log(`Feathers application started on ${port}`);
});

// log errors
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('uncaughtException', err => {
  console.error(err);
});

this.app = app;
