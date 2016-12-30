import path = require('path');
// const serveStatic = require('feathers').static;
// const favicon = require('serve-favicon');
import compress = require('compression');
import cors = require('cors');
import feathers = require('feathers');
import configuration = require('feathers-configuration');
import hooks = require('feathers-hooks');
import bodyParser = require('body-parser');
import socketio = require('feathers-socketio');
import middleware = require('./middleware');
import services = require('./services');

const app = feathers();

app.configure(configuration());

app.use(compress())
  .options('*', cors())
  .use(cors())
  // .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  // .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(socketio(io => {
    io.on('error', function (err) {
      console.error(err);
    });
  }))
  .configure(services)
  .configure(middleware);

export default app;
