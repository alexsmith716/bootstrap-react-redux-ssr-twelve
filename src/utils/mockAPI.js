// import TimeElapsedClass from './TimeElapsedClass';
import timeElapsedClass from './timeElapsedClassTwo';
import timeElapsedModule from './timeElapsedModule';

const timeElapsedClass1 = new timeElapsedClass();
const timeElapsedClass2 = new timeElapsedClass();

const timeElapsedModule1 = timeElapsedModule();
const timeElapsedModule2 = timeElapsedModule();

// ------------------------------------------------------------------------

// https://tc39.github.io/ecma262/#sec-date.now
// new Date().getTime()

// closure: the combination of a function and the lexical environment within which that function was declared
// lexical environment: consists of any local variables that were in-scope at the time the closure was created
// closures are useful because they let you associate some data (lexical environment) with a function that operates on that data
// use a closure anywhere an object with only a single method might be used
// functions in JS form closures

// Closure Scope Chain (closures have 3 scopes):
//  1) Local Scope (the closure's scope)
//  2) Outer Functions Scope (lexical env)
//  3) Global Scope (root)
//  ***** all closures have access to all outer function scopes within which they were declared *****

function closureFuncDemo1(lexicalEnvVar) {
  return function(y) {
    return `${lexicalEnvVar}-${y}`;
  };
}

// ------------------------------------------------------------------------

export function getRandomInt() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

function basicPromiseResolveRejectImmediate(p) {
  return new Promise((resolve, reject) => {
    if (p) {
      resolve('>>>>>>>>>>> mockAPI > basicPromise > PROMISE is TRUE <<<<<<<<<<<<<');
    } else {
      reject('>>>>>>>>>>> mockAPI > basicPromise > PROMISE is FALSE <<<<<<<<<<<<<');
    }
  });
}

function basicPromiseResolvePending() {
  return new Promise(resolve => {
    setTimeout(() => resolve( {
      city: 'New York',
      forecast: 'partly cloudy'
    } ), 200);
  });
}

function awaitForReturnValueOfAFunction(r) {
  return r;
}

function startSetTimeout(delay) {
  // setTimeout(() => console.log('###### mockAPI > startSetTimeout > secondsElapsed: ', timeElapsedClass1.getSecondsElapsed()), delay);
  setTimeout(() => console.log('###### mockAPI > startSetTimeout > secondsElapsed: ', timeElapsedModule1.getSecondsElapsed()), delay);
}

function startResolvedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( timeElapsedModule1.getSecondsElapsed() ), delay);
    // setTimeout(() => resolve( timeElapsedClass1.getSecondsElapsed() ), delay);
  });
}

function startResolvedRejectedPromise(v, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'resolve') {
        resolve({
          value: `${v}`,
          // timeElapsed: timeElapsedClass1.getSecondsElapsed(),
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'RESOLVED! This came from the mock API.'
        });
      } else {
        reject({
          value: `${v}`,
          // timeElapsed: timeElapsedClass1.getSecondsElapsed(),
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'REJECTED! This came from the mock API.'
        });
      }
    }, delay);
  });
};

function postRequestConcatResolveRejectPromise(dataObj, r, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (r === 'resolve') {
        resolve({
          value: `${r}`,
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'RESOLVED! 200 - Data Found.',
          status: 200,
          data: dataObj.data.concat(dataObj.newData)
        });
      } else {
        reject({
          value: `${r}`,
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'REJECTED! 404 - Data Not Found.',
          status: 404,
          // data: dataObj.data
        });
      }
    }, delay);
  });
  console.log('###### mockAPI > postRequestConcatResolveRejectPromise(1600) PPPPPPPP: ', promise);
  return promise;
};

// 2nd promise is rejected but being resolved and returned on 1st promise from reducer load action
// promise.all: rejects with reason of 1st promise that rejects
// async always return a promise
// await suspends execution until the promise is settled
// async/await: take advantage of the generator pattern
// async/await: make asynchronous operations with promises work in an synchronous manner

// async returns a promise, which can be resolved to a value
// await suspends the execution until the promise is settled
// obj instanceof Promise

async function doSomeAsyncSyncLikeOperations() {

  //console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedClass1.getSecondsElapsed 1: ${timeElapsedClass1.getSecondsElapsed()}`);
  console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedModule1.getSecondsElapsed() 1: ${timeElapsedModule1.getSecondsElapsed()}`);

  const startSetTimeoutArrayLong = [];
  startSetTimeoutArrayLong.push(startResolvedPromise(2500));
  startSetTimeoutArrayLong.push(startResolvedPromise(22250));

  const startSetTimeoutArrayFast = [];
  startSetTimeoutArrayFast.push(startResolvedPromise(100));
  startSetTimeoutArrayFast.push(startResolvedPromise(300));

  // -------------------------

  const p = await startResolvedPromise(1500);
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedPromise(1500) > secondsElapsed p: ', p);

  // -------------------------

  startSetTimeout(10000);

  // -------------------------

  const g = await startResolvedPromise(4000);
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedPromise(4000) > secondsElapsed g: ', g);

  // -------------------------

  // const pAf1 = await Promise.all(startSetTimeoutArrayFast);
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayFast1-0: ', (pAf1[0]-dn) );
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayFast1-1: ', (pAf1[1]-dn) );

  // // -------------------------

  // const pAl = await Promise.all(startSetTimeoutArrayLong);
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayLong1-0: ', (pAl[0]-dn) );
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayLong1-1: ', (pAl[1]-dn) );

  // -------------------------

  const b = await startResolvedPromise(100);
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedPromise(100) > secondsElapsed b: ', b);

  const z = await startResolvedPromise(4000);
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedPromise(4000) > secondsElapsed z: ', z);

  // -------------------------

  // const a = startResolvedRejectedPromise('foober', 500);

  // a.then(
  //   (val) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > a > resolve: ', val ) },
  //   (error) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > a > reject: ', error ) }
  // );

  // const aa = startResolvedRejectedPromise('json', 600);

  // aa.then(
  //   (val) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > aa > resolve: ', val ) },
  //   (error) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > aa > reject: ', error ) }
  // );

  // const aaa = startResolvedRejectedPromise('fooberrrrr', 15000);

  // aaa.then(
  //   (val) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > aaa > resolve: ', val ) },
  //   (error) => { console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > aaa > reject: ', error ) }
  // );

  // -------------------------

  // const pAf2 = await Promise.all(startSetTimeoutArrayFast);
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayFast2-0: ', (pAf2[0]-dn) );
  // console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startSetTimeoutArrayFast2-1: ', (pAf2[1]-dn) );

  // -------------------------

  // try {
  //   const k = await startResolvedRejectedPromise('foober', 1200);
  //   return k;
  // } catch (error) {
  //   console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > startResolvedRejectedPromise > k catch > error: ', error);
  //   return error;
  // }

  //console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedClass1.getSecondsElapsed 2: ${timeElapsedClass1.getSecondsElapsed()}`);
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedModule1.getSecondsElapsed() 2: ', timeElapsedModule1.getSecondsElapsed());

  timeElapsedClass2.setStartTime();
  timeElapsedModule2.setStartTime();

  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedClass1.getStartTime(): ', timeElapsedClass1.getStartTime());
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedClass2.getStartTime(): ', timeElapsedClass2.getStartTime());

  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedModule1.getStartTime(): ', timeElapsedModule1.getStartTime());
  console.log('###### mockAPI > doSomeAsyncSyncLikeOperations > timeElapsedModule2.getStartTime(): ', timeElapsedModule2.getStartTime());
}

// =========================================================================
// =========================================================================

export async function getSomeAsyncData(location) {

  console.log('###### mockAPI > getSomeAsyncData > location: ', location);

  timeElapsedClass1.setStartTime();
  timeElapsedModule1.setStartTime();

  // doSomeAsyncSyncLikeOperations();
  // await doSomeAsyncSyncLikeOperations();

  const response = await startResolvedRejectedPromise('resolve', 1200);
  console.log('###### mockAPI > getSomeAsyncData > startResolvedRejectedPromise(1600) response: ', response);
  return await response;
}

// ------------------------------------------------------------------------

export function postRequestConcatExportASYNC(req) {

  console.log('###### mockAPI > postRequestConcatExportASYNC > req: ', req);

  timeElapsedModule1.setStartTime();

  const promise = postRequestConcatResolveRejectPromise(req, 'resolve', 1600);
  console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE: ', promise);

  // not passing value as next result here / not chaining
  // promise.then(result => {
  //   console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE.THEN1:', result);
  //   return result;
  // });

  // promise.then(result => {
  //   console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE.THEN2:', result);
  //   return result;
  // });

  // chaining - returned handler value is result of next chained handler
  // a sequence of asynchronous tasks done one after another
  const thenProm = promise
    .then(result => {
      console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE.THEN1:', result);
      result.message += ' P1,'
      return result;
    })
    .then(result => {
      console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE.THEN2:', result);
      result.message += ' P2,'
      return result;
    })
    .then(result => {
      console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) PROMISE.THEN3:', result);
      result.message += ' P3,'
      return result;
    })
  // handle rejected promise in action creator (closest rejection handler)
  //   .catch(error => {
  //     console.log('###### mockAPI > postRequestConcatExportASYNC > postRequestConcatResolveRejectPromise(1600) CATCH:ERROR:', error);
  //     return Promise.reject(error);
  //     throw error;
  //   });

  return thenProm;
  // return promise;
}

// ------------------------------------------------------------------------

export async function postRequestConcatExportSYNC(req) {

  console.log('###### mockAPI > postRequestConcatExportSYNC > req: ', req);

  timeElapsedModule1.setStartTime();

  // resolved promise object returned
  let promise = await postRequestConcatResolveRejectPromise(req, 'resolve', 1600);
  console.log('###### mockAPI > postRequestConcatExportSYNC > postRequestConcatResolveRejectPromise(1600) PROMISE: ', promise);

  // return await promise;
  return promise;
}

// ------------------------------------------------------------------------

export function mockAPI(doWhat, delay) {
  console.log('###### export function mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
