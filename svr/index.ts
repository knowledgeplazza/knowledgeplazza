import app from './app';
const port = app.get('port');
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
