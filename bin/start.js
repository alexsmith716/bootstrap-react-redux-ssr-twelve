const fs = require('fs');
require('colors');
// const helmet = require('helmet');
const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const http = require('http');
// const httpProxy = require('http-proxy');
const https = require('https');
const favicon = require('serve-favicon');
// const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

console.log('>>>>>>>>>>>>>>>>> START > __CLIENT__ ?: ', __CLIENT__);
console.log('>>>>>>>>>>>>>>>>> START > __SERVER__ ?: ', __SERVER__);
console.log('>>>>>>>>>>>>>>>>> START > __DEVELOPMENT__ ?: ', __DEVELOPMENT__);
console.log('>>>>>>>>>>>>>>>>> START > __DISABLE_SSR__ ?: ', __DISABLE_SSR__);
console.log('>>>>>>>>>>>>>>>>> START > __DLLS__ ?: ', __DLLS__);

const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT
};

const unhandledRejections = new Map();

process.on('unhandledRejection', (reason, promise) => {
  console.error('>>>>>>>> BIN > START > process > Unhandled Rejection at promise:', promise);
  console.error('>>>>>>>> BIN > START > process > Unhandled Rejection reason:', reason);
  unhandledRejections.set(promise, reason);
});

process.on('rejectionHandled', promise => {
  console.error('>>>>>>>> BIN > START > process > rejectionHandled > promise:', promise);
  unhandledRejections.delete(promise);
});

// const dbURL = config.mongoDBmongooseURL;
//
// const mongooseOptions = {
//   autoReconnect: true,
//   keepAlive: true,
//   connectTimeoutMS: 30000,
//   useNewUrlParser: true
// };

// https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
// https://nodejs.org/api/all.html#tls_tls_createserver_options_secureconnectionlistener
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/localhost.crt')),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();
// const server = http.createServer(app);
const server = https.createServer(httpsOptions, app);

// app.set('port', port);
app.use(morgan('dev'));

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy(config.app.csp));
// app.use(helmet.xssFilter());
// app.use(headers);

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'build', 'favicon.ico')));

// ---------------------------------------------------------------------

// const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

// const proxy = httpProxy.createProxyServer({
//   target: targetUrl,
//   ws: true
// });

// ---------------------------------------------------------------------

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>> START > REQUEST IN <<<<<<<<<<<<<<<<<<<<<<<');
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.ip +++++++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.method +++++++++++++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.url ++++++++++++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.path ++++++++++++++++++: ', req.path);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.headers ++++++++++++++: ', req.headers);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.cookies ++++++++++++++: ', req.cookies);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.session ++++++++: ', req.session);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.params +++++++++: ', req.params);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.originalUrl ++++: ', req.originalUrl);
  console.log('>>>>>>>>>>>>>>>>> START > REQUEST OUT <<<<<<<<<<<<<<<<<<<<<<<');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/dist/service-worker.js', (req, res, next) => {
    console.log('>>>>>>>>>>>>>>>>> START > app.use > service-worker <<<<<<<<<<<<<<<<<<<<<<<');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
}

// app.use((req, res, next) => {
//   console.log('>>>>>>>>>>>>>>>>> START > app.use(res.setHeader(X-Forwarded-For) <<<<<<<<<<<<<<<<<<<<<<<');
//   res.setHeader('X-Forwarded-For', req.ip);
//   next();
// });

// // Proxy to API server
// app.use('/api', (req, res) => {
//   console.log('>>>>>>>>>>>>>>>>> START > app.use(/api) <<<<<<<<<<<<<<<<<<<<<<<');
//   proxy.web(req, res, { target: targetUrl });
// });
//
// app.use('/ws', (req, res) => {
//   console.log('>>>>>>>>>>>>>>>>> START > app.use(/ws) <<<<<<<<<<<<<<<<<<<<<<<');
//   proxy.web(req, res, { target: `${targetUrl}/ws` });
// });
//
// server.on('upgrade', (req, socket, head) => {
//   console.log('>>>>>>>>>>>>>>>>> START > proxy.on(error) <<<<<<<<<<<<<<<<<<<<<<<');
//   proxy.ws(req, socket, head);
// });
//
// proxy.on('error', (error, req, res) => {
//   console.log('>>>>>>>>>>>>>>>>> START > proxy.on(error) <<<<<<<<<<<<<<<<<<<<<<<');
//   if (error.code !== 'ECONNRESET') {
//     console.error('proxy error', error);
//   }
//   if (!res.headersSent) {
//     res.writeHead(500, { 'content-type': 'application/json' });
//   }
//
//   const json = {
//     error: 'proxy_error',
//     reason: error.message
//   };
//   res.end(JSON.stringify(json));
// });

// ---------------------------------------------------------------------

const normalizePort = val => {
  const parseIntPort = parseInt(val, 10);
  if (Number.isNaN(parseIntPort)) {
    // named pipe
    return val;
  }
  if (parseIntPort >= 0) {
    // port number
    return parseIntPort;
  }
  return false;
};

console.log('>>>>>>>> BIN > START > COMMON > CONFIG >>>>>>>>>>>>>>>>>>>>>>>>: ', config);
const portNum = Number(config.port);
const port = normalizePort(__DEVELOPMENT__ ? portNum : portNum);

server.on('error', err => {
  // if (err.code === 'EACCES') {
  //   // requires elevated privileges
  // }
  if (err.code === 'EADDRINUSE') {
    console.error('>>>>>>>> BIN > START > ERROR > Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(port, config.host);
    }, 1000);
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log('>>>>>>>> BIN > START > Express server Listening on: ', bind);
  // mongoose.Promise = global.Promise;
  // mongoose.connect(
  //   dbURL,
  //   mongooseOptions,
  //   err => {
  //     if (err) {
  //       console.erro r('>>>>>>>> BIN > START > Please make sure Mongodb is installed and running!');
  //     } else {
  //       console.error('>>>>>>>> BIN > START > Mongodb is installed and running!');
  //     }
  //   }
  // );
});

let isBuilt = false;

// method: 'app.listen(path, [callback])' <<< is identical to Node's 'http.Server.listen()'
const done = function () {
  if (!isBuilt) {
    server.listen(port, config.host, err => {
      isBuilt = true;
      console.log('>>>>>>>> BIN > START > STATS COMPILER HAS COMPLETED BUILD !! WAIT IS OVER !');
      if (err) {
        console.error('>>>>>>>> BIN > START > ERROR:', err);
      }
      console.info('>>>>>>>> BIN > START > Express server Running on Host:', config.host);
      console.info('>>>>>>>> BIN > START > Express server Running on Port:', port);
    });
  }
};

if (portNum) {
  console.log('>>>>>>>> BIN > START > __DEVELOPMENT__ ?: ', __DEVELOPMENT__);
  console.log('>>>>>>>> BIN > START > STATS COMPILER ATTEMPTING BUILD ! PLEASE WAIT ! ...');

  app.use(express.static(path.join(__dirname, '..', 'build')));

  if (__DEVELOPMENT__) {
    const clientConfigDev = require('../webpack/dev.client');
    const serverConfigDev = require('../webpack/dev.server');
    // https://github.com/webpack/webpack.js.org/blob/master/src/content/configuration/dev-server.md
    // https://github.com/webpack/webpack-dev-middleware
    // https://webpack.js.org/configuration/stats/
    // https://webpack.js.org/api/node/#multicompiler
    // https://webpack.js.org/concepts/hot-module-replacement/
    // https://github.com/gaearon/react-hot-loader
    // https://github.com/webpack/webpack-dev-server
    // https://github.com/webpack-contrib/webpack-hot-middleware

    const { publicPath } = clientConfigDev.output;

    // lazy: instructs module to operate in 'lazy' mode (recompiles when files change, not on each request)
    // serverSideRender: instructs the module to enable or disable the server-side rendering mode
    // serverSideRender: enables access to stats > res.locals.webpackStats
    const serverOptions = {
      // lazy: false,
      stats: { colors: true },
      // serverSideRender: true,
      publicPath
      // writeToDisk: true
      // headers: { 'Access-Control-Allow-Origin': '*' }
    };

    app.use('/dlls/:dllName.js', (req, res, next) => {
      console.log('>>>>>>>>>>>>>>>>> START > app.use > DLLs <<<<<<<<<<<<<<<<<<<<<<<');
      /* eslint-disable max-len */
      fs.access(path.join(__dirname, '..', 'build', 'dlls', `${req.params.dllName}.js`), fs.constants.R_OK, err => err ? res.send(`################## NO DLL !!! (${req.originalUrl})') ##################`) : next());
    });

    // webpack compiler instance
    const compiler = webpack([clientConfigDev, serverConfigDev]);

    const clientCompiler = compiler.compilers[0];
    // const serverCompiler = compiler.compilers[1];

    // allows for serving of the files emitted from webpack
    // passing both client and server compilations
    const devMiddleware = webpackDevMiddleware(compiler, serverOptions);
    app.use(devMiddleware);

    // the following middleware would not be invoked until the latest build is finished
    app.use((req, res, next) => {
      // const webpackStats = res.locals.webpackStats.toJson();
      // const clientStats = res.locals.webpackStats.toJson().children[0];
      // console.log('>>>>>>>>>>>>>>>>> START > webpackStats:', webpackStats);
      // console.log('>>>>>>>>>>>>>>>>> START > clientStats:', clientStats);
      next();
    });

    // add hot reloading into server
    // connects browser to server and receives updates
    // subscribes to changes from server and executes changes using webpack HMR
    // ('webpack-hot-middleware'  <<<<<<<<< webpack hot reloading)
    // ('react-hot-loader' <<<<<<<<<<<<<<<< app hot reloading)
    app.use(webpackHotMiddleware(clientCompiler));

    // hot update webpack bundles on the server
    // ensures server bundle is the latest compilation without a restart
    // allows client and server bundle to share same Webpack cache for faster builds
    // uses an in-memory bundle on the server to avoid hitting the disk
    // --------------------------
    // chokidar.watch(): wrapper around node.js fs.watch / fs.watchFile / FSEvents
    // nodemon: monitor for changes in app and automatically restart the server (for development)
    // --------------------------
    // webpackHotServerMiddleware: hot update webpack bundles on the server
    // webpackHotServerMiddleware: expects client/server array compiler instance
    app.use(webpackHotServerMiddleware(compiler, { chunkName: 'server' }));

    // execute callback when compiler bundle is valid, typically after compilation
    // callback is executed when the bundle becomes valid
    // if bundle is valid at the time of calling, callback is executed immediately
    devMiddleware.waitUntilValid(done);
  } else {
    const clientConfigProd = require('../webpack/prod.client');
    const serverConfigProd = require('../webpack/prod.server');

    // webpack provides a Node.js API which can be used directly in Node.js runtime
    // Node.js API: all the reporting and error handling must be done manually and webpack only does the compiling part
    // For this reason the stats configuration options will not have any effect (no stats about module builds)
    // call the 'run' method on the compiler instance
    // 'run' method is then used to kickstart all compilation work
    webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
      if (err) {
        console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > err: ', err.stack || err);
        if (err.details) {
          console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > err.details: ', err.details);
        }
        return;
      }

      // done processing now have stats object
      const clientStats = stats.toJson().children[0];

      // console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > clientStats: ', clientStats);

      // errors and warnings (stats object)
      if (stats.hasErrors()) {
        console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > stats.hasErrors: ', clientStats.errors);
      }
      if (stats.hasWarnings()) {
        console.warn('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > stats.hasWarnings: ', clientStats.warnings);
      }

      const serverRender = require('../build/server/server.js').default;

      // app.use(express.static(outputPath));

      // const serverRenderTest = require('../build/server/serverTest.js').default;
      // app.use(serverRenderTest({ clientStats }));

      // provide stats object (module and chunk information) to 'webpack-flush-chunks' && 'react-universal-component'
      // 'webpack-flush-chunks':      (server-to-client chunk discovery + transportation)
      // 'react-universal-component': (simultaneous SSR + Code Splitting)
      // server.js: export default ({ clientStats }) => async (req, res) => {}
      // now express application-level middleware
      // function executed every time the app receives a request
      app.use(serverRender({ clientStats }));

      done();
    });
  }
} else {
  console.error('>>>>>>>> BIN > START > Missing config.port <<<<<<<<<<<<<');
}

// MONGOOSE CONNECTION EVENTS

// mongoose.connection.on('connected', () => {
//   console.log(`>>>>>>>> BIN > START > Mongoose Connection: ${dbURL}`);
// });
//
// mongoose.connection.on('error', err => {
//   console.log(`>>>>>>>> BIN > START > Mongoose Connection error: ${err}`);
// });
//
// mongoose.connection.on('disconnected', () => {
//   console.log('>>>>>>>> BIN > START > Mongoose Connection disconnected');
// });
//
// // CLOSE MONGOOSE CONNECTION
//
// const gracefulShutdown = (msg, cb) => {
//   mongoose.connection.close(() => {
//     console.log(`>>>>>>>> BIN > START > Mongoose Connection closed through: ${msg}`);
//     cb();
//   });
// };

// #########################################################################

// https://nodejs.org/api/process.html#process_process_nexttick_callback_args
// process.nextTick(callback[, ...args])
// 'process.nextTick()' adds callback to the "next tick queue"
// queue is fully drained after the current operation on the JavaScript stack runs to completion
//  and before the event loop is allowed to continue

console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > START <<<<<<<<<<<<<<<<');

process.nextTick(() => {
  console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > nextTick CALLBACK <<<<<<<<<<<<<<<<<<<');
});

console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > SCHEDULED <<<<<<<<<<<<');
// Output:
// start
// scheduled
// nextTick callback

// #########################################################################

const gracefulShutdown = (msg, cb) => {
  console.log(`>>>>>>>> BIN > START > Mongoose Connection closed through: ${msg}`);
  cb();
};

// listen for Node processes / events
// https://nodejs.org/api/process.html

// Node process is about to exit (called explicitly OR event loop has no additional work to perform)
process.on('exit', code => {
  console.log(`>>>>>>>> BIN > START > About to exit with code: ${code}`);
});

// exceptional conditions that are brought to user attention
process.on('warning', warning => {
  console.warn('>>>>>>>> BIN > START > Node process warning.name:', warning.name);
  console.warn('>>>>>>>> BIN > START > Node process warning.message:', warning.message);
  console.warn('>>>>>>>> BIN > START > Node process warning.stack:', warning.stack);
});

// listen to Node process for Signal Events

// Monitor App termination
process.on('SIGINT', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGINT message:', m);
  gracefulShutdown('app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGINT gracefulShutdown');
    process.exit(0);
  });
});

// For nodemon restarts
process.once('SIGUSR2', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGUSR2 message:', m);
  gracefulShutdown('nodemon restart', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGUSR2 gracefulShutdown');
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For Heroku app termination
process.on('SIGTERM', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGTERM message:', m);
  gracefulShutdown('Heroku app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGTERM gracefulShutdown');
    process.exit(0);
  });
});
