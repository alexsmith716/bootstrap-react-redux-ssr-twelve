import React from 'react';
import ReactDOM from 'react-dom/server';
// import { Provider } from './components';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { getStoredState } from 'redux-persist'; 
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage'; 
import { trigger } from 'redial';

import asyncMatchRoutes from './utils/asyncMatchRoutes';
import routes from './routes';
import configureStore from './redux/configureStore';
import initialStatePreloaded from './redux/initial-preloaded-state';
import { getUserAgent, isBot } from './utils/device';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
// import { flushFiles } from 'webpack-flush-chunks';

import Html from './helpers/Html';
import config from '../config/config';
import apiClient from './helpers/apiClient';
// import { createApp } from './app';

console.log('>>>>>>>>>>>>>>>>> SERVER > ES > CONFIG >>>>>>>>>>>>>>>>>>>>>>>>: ', config);

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
)

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// function binding: creating a function that calls another function with a specific 'this' value and with specific arguments
// function binding: technique used in conjunction with callbacks and event handlers
// function binding: used to preserve code execution context while passing functions around as variables

// HOF is a function which returns a function
// function currying: create a function that has arguments already set
// basic approach: use a closure to return a new function ()
// closure: 
//    * the combination of a function (return async function(req, res)) 
//    * and the lexical environment within which that function was DECLARED ({ clientStats })
// --------------------------
export default ({ clientStats }) => async (req, res) => {
// export default function({ clientStats }) {
//   // anonymous wrapper that creates a closure with access to above lexical env var '{ clientStats }'
//   // returned as express middleware
//   return async function(req, res) {
  console.log('>>>>>>>>>>>>>>>>> SERVER > __CLIENT__ ?: ', __CLIENT__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > __SERVER__ ?: ', __SERVER__);

  req.counter = getRandomInt(1, 100);
  req.userAgent = getUserAgent(req.headers['user-agent']);
  req.isBot = isBot(req.headers['user-agent']);

  console.log('>>>>>>>>>>>>>>>>> SERVER > req.counter ?: ', req.counter);
  console.log('>>>>>>>>>>>>>>>>> SERVER > req.userAgent ?: ', req.userAgent);
  console.log('>>>>>>>>>>>>>>>>> SERVER > req.isBot ?: ', req.isBot);

  // ----------------------------------

  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST IN <<<<<<<<<<<<<<<<<<<<<<<');
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.ip +++++++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.method +++++++++++++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++++++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.path ++++++++++++++++++: ', req.path);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++++++++++++: ', req.headers);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.cookies ++++++++++++++: ', req.cookies);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.session ++++++++: ', req.session);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.params +++++++++: ', req.params);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.originalUrl ++++: ', req.originalUrl);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST OUT <<<<<<<<<<<<<<<<<<<<<<<');

  if (req.url === '/manifest.json' || req.url === '/Manifest.json') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > req.url === /manifest.json !!!!!! <<<<<<<<<<<<<<<<<<<<<<<');
  }

  // ----------------------------------

  console.log('>>>>>>>>>>>>>>>>>>> SERVER > APP LOADER > SetUpComponent !! START !! <<<<<<<<<<<<<<<<<<<<<<<');

  // 'initialEntries': The initial URLs in the history stack
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

  console.log('>>>>>>>>>>>>>>>>>>> SERVER > APP LOADER > history: ', history)

  const preloadedState = initialStatePreloaded(req);

  console.log('>>>>>>>>>>>>>>>> SERVER > preloadedState: ', preloadedState);

  const providers = {
    client: apiClient(req)
  };

  const store = configureStore({
    history,
    data: preloadedState,
    helpers: providers
  });

  console.log('>>>>>>>>>>>>>>>> SERVER > store: ', store);

  function hydrate(a) {
    console.log('>>>>>>>>>>>>>>>>>>> SERVER > function hydrate(a) !!!!!!!!! <<<<<<<<<<<<<<<<<<<<<<<');
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
  }

  // store.dispatch(actions.notifs.send({ text: 'Dispatched Message action from server...', type: message.types.success }));

  try {

    const { components, match, params } = await asyncMatchRoutes(routes, req.path);

    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > components: ', components);
    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > match: ', match);
    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > params: ', params);

    // ===================================================================================================

    // prefetch all data (state) for set of routes on server before render
    // what data do i want to ensure to send on the SSR...
    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    // ensure all data for a set of routes is prefetched on the server before attempting to render
    // in order to accommodate this, define and trigger custom route-level lifecycle hooks on route handlers
    // '@provideHooks' decorator allows defining hooks for custom lifecycle events, 
    //      returning promises if any asynchronous operations need to be performed
    // trigger function: initiate an event for an arbitrary array of components
    // Wait for async data fetching to complete, then render
    // returns a promise
    // Triggering lifecycle events (initiate 'provideHooks' 'fetch' event > App.js)
    // redux > modules > INFO
    await trigger('fetch', components, triggerLocals);

    // ===================================================================================================

    // <Provider store={store} {...providers}> : 
    //    * makes the Redux store available to any nested components that have been wrapped in the connect() function
    //    * store={store} : the single Redux store in the app
    //    * {...providers} : providing a custom context to access the store (apiClient)

    // <Router history={history}> :
    //    * synchronize a custom history with state management (Redux)
    //    * history={history} : a 'history' object to use for navigation (a dependency of React Router)

    // <StaticRouter location={req.originalUrl} context={context}>
    //    * A <Router> that never changes location
    //    * useful in server-side rendering scenarios because the location never actually changes (SSR to SPA)
    //    * location={req.originalUrl} : The URL the server received, probably 'req.url' on a node server

    // {renderRoutes(routes)} : routes to render

    // 'context' object contains the results of the render
    const context = {};

    const component = (
      <Provider store={store} {...providers}>
        <Router history={history}>
          <StaticRouter location={req.originalUrl} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Router>
      </Provider>
    );

    const content = ReactDOM.renderToString(component);

    // ------------------------------------------------------------------------------------------------------

    // 'flushChunks' and 'flushFiles' called immediately after ReactDOMServer.renderToString
    const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > JS: ', assets.Js);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > STYLES: ', assets.Styles);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CSS: ', assets.Css);

    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .js: ', assets.js);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > styles: ', assets.styles);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .css: ', assets.css);

    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > scripts: ', assets.scripts);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > stylesheets: ', assets.stylesheets);

    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHashRaw: ', assets.cssHashRaw);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHash: ', assets.cssHash);
    // console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CssHash: ', assets.CssHash);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > publicPath: ', assets.publicPath);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > outputPath: ', assets.outputPath);

    // ===============================================================================
    // ===============================================================================

    // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++++++++++++: ', req.url);

    // It offers 2 functions flushChunks and flushFiles, which you call immediately after ReactDOMServer.renderToString. 
    // They are used in server-rendering to extract the minimal amount of chunks to send to the client, 
    // thereby solving a missing piece for code-splitting: server-side rendering.

    // console.log('>>>>>>>>>>>>>>>>> SERVER > __DISABLE_SSR__:', __DISABLE_SSR__);

    if (__DISABLE_SSR__) {
      return hydrate(assets);
    }

    // ===============================================================================
    // ===============================================================================

    // console.log('>>>>>>>>>>>>>>>> SERVER > context.url: ', context.url);

    // 'context.url' will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(301, context.url);
    }

    // ------------------------------------------------------------------------------------------------------

    const { location } = history;

    if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(location.pathname + location.search)) {
      return res.redirect(301, location.pathname);
    }

    // ------------------------------------------------------------------------------------------------------

    // console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== ASSETS  !!: ', assets);
    // console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== STORE   !!: ', store);
    // console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== CONTENT !!: ', content);

    const html = <Html assets={assets} store={store} content={content} />;
    const ssrHtml = `<!doctype html>${ReactDOM.renderToString(html)}`;

    // console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > RESPOND TO CLIENT !! > renderToString(html):', ssrHtml);

    res.status(200).send(ssrHtml);
    // res.status(200).send('SERVER > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');

  } catch (error) {
    console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > TRY > ERROR > error: ', error);
    res.status(500);
    hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
  }
};
