import app from './app';

const port = process.env.PORT || 8081;

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
