import axios from 'axios';
import TimeElapsed from './timeElapsed';
import timeElapsedModule from './timeElapsedModule';

// A simple function ------------------------
// var simple = (a) => {return a}
// simple(5) // called by its name

// A simple method ------------------------
// var obj = {simple : (a) => {return a} } 
// obj.simple(5) // called by its name along with its associated object

// var obj = {
//   simple : (a) => {
//     return a
//   } 
// } 
// obj.simple(5)

// let myObj = {
//   name: 'fancy',
//   operation: () => {
//     return console.log(this);
//   } 
// }
// myObj.operation();

// ===========================================================

export function getRandomInt() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

function getDateNow2(dn) {
  const d = Date.now();
  const nd = d - dn;
  console.log('###### mockAPI > getDateNow2: ', nd);
  return d;
}

function mostBasicPromiseResolveRejectImmediate(p) {
  return new Promise((resolve, reject) => {
    if (p) {
      resolve('>>>>>>>>>>> mockAPI > mostBasicPromise > PROMISE is TRUE <<<<<<<<<<<<<');
    } else {
      reject('>>>>>>>>>>> mockAPI > mostBasicPromise > PROMISE is FALSE <<<<<<<<<<<<<');
    }
  });
}

function mostBasicPromiseResolvePending() {
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
  setTimeout(() => console.log('###### mockAPI > startSetTimeout > secondsElapsed: ', TimeElapsed.secondsElapsed), delay);
}

function startResolvedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( TimeElapsed.secondsElapsed ), delay);
  });
}

function startResolvedRejectedPromise(v, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'foober') {
        resolve({
          resolved: 'RESOLVED',
          value: `${v}`,
          time: TimeElapsed.secondsElapsed,
          delay: `${delay}`
        });
      } else {
        reject({
          reject: 'REJECTED',
          value: `${v}`,
          time: TimeElapsed.secondsElapsed,
          delay: `${delay}`
        });
      }
    }, delay);
  });
}

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

  console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > secondsElapsed 1: ${TimeElapsed.secondsElapsed}`);

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

  console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > secondsElapsed 2: ${TimeElapsed.secondsElapsed}`);
  // console.log(`###### mockAPI > doSomeAsyncSyncLikeOperations > secondsElapsedX: ${TimeElapsed.secondsElapsedX(Date.now())}`);

  console.log('###### mockAPI > getSomeAsyncData > timeElapsedModule.secondsElapsed(): ', timeElapsedModule.secondsElapsed());
}

export async function getSomeAsyncData(location) {

  // ES2017
  // console.log('###### mockAPI > Object.getOwnPropertyDescriptor(TimeElapsed): ', Object.getOwnPropertyDescriptor(TimeElapsed));

  // initiate TimeElapsed startTime
  TimeElapsed.startTime = Date.now();

  console.log(`###### mockAPI > getSomeAsyncData > TimeElapsed.startTime: ${TimeElapsed.startTime}`);

  TimeElapsed.secondsElapsedX(Date.now())

  // =========================================================================
  // =========================================================================

  console.log('###### mockAPI > getSomeAsyncData > timeElapsedModule.startTime(): ', timeElapsedModule.startTime());

  
  // =========================================================================
  // =========================================================================

  // doSomeAsyncSyncLikeOperations();
  await doSomeAsyncSyncLikeOperations();

  console.log(`###### mockAPI > getSomeAsyncData > secondsElapsed 2: ${TimeElapsed.secondsElapsed}`);

  try {

    const k = await startResolvedRejectedPromise('foober', 1200);
    console.log('###### mockAPI > getSomeAsyncData > startResolvedRejectedPromise(1200) k: ', k);
    return k;

  } catch (error) {
    console.log('###### mockAPI > getSomeAsyncData > k > catch > error: ', error);
    return error;
  }

  // try {
  //   const response = await axios.get(location);
  //   const e = await awaitForReturnValueOfAFunction(response.data);
  //   return e;
  // } catch (error) {
  //   console.log('###### mockAPI > getSomeAsyncData() > catch > error: ', error);
  //   return error;
  // }
}

export function mockAPI(doWhat, delay) {
  console.log('###### export function mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
