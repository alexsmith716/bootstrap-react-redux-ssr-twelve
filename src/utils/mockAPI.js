import axios from 'axios';

// var simple = (a) => {return a} // A simple function
// simple(5) // called by its name

// var obj = {simple : (a) => {return a} } // A simple method
// obj.simple(5) // called by its name along with its associated object

// new Promise (constructor)
// constructor accepts a function (executor)
// executor accepts 2 parameters resolve & reject
// resolve & reject are functions

// PromiseStatus: (pending > resolved | rejected)

// Promise object Prototype methods:
//   .catch( onRejected )
//   .then( onFulfilled, onRejected )
//   .finally( onFinally )

export function getRandomInt() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

export function getDateNow() {
  return Date.now();
}

function getDateNow2(dn) {
  const d = Date.now();
  const nd = d - dn;
  console.log('###### mockAPI() > getDateNow: ', nd);
  return d;
}

function mostBasicPromiseResolveRejectImmediate(p) {
  return new Promise((resolve, reject) => {
    if (p) {
      resolve('>>>>>>>>>>> mockAPI() > mostBasicPromise > PROMISE is TRUE <<<<<<<<<<<<<');
    } else {
      reject('>>>>>>>>>>> mockAPI() > mostBasicPromise > PROMISE is FALSE <<<<<<<<<<<<<');
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

function startSetTimeout(dn, delay) {
  // setTimeout(() => getDateNowAsync(dn), delay);
  setTimeout(() => getDateNow2(dn), delay);
}

function startResolvedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( getDateNow() ), delay);
  });
}

function startResolvedRejectedPromise(v, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'foober') {
        resolve({
          resolved: 'RESOLVED',
          value: `${v}`,
          delay: `${delay}`
        });
      } else {
        reject({
          reject: 'REJECTED',
          value: `${v}`,
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
// async/await: take advantage of the generator pattern and make code behave synchronously

// sequence (there is a pattern there)

// ###### mockAPI() > getMetaWeather() > startResolvedPromise(4000):  4001
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast1-0:  102
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast1-1:  302
// ###### mockAPI() > getMetaWeather() > startResolvedPromise(1500):  5502
// ###### mockAPI() > getDateNow:  10002
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayLong1-0:  2502
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayLong1-1:  22252
// ###### mockAPI() > getMetaWeather() > startResolvedPromise(100):  22355
// ###### mockAPI() > getMetaWeather() > startResolvedPromise(4000):  26359
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast2-0:  102
// ###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast2-1:  302
// ###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > a > resolve:  { resolved: 'RESOLVED', value: 'foober', delay: '500' }
// ###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aa > reject:  { reject: 'REJECTED', value: 'json', delay: '600' }
// ###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > k catch > error:  { reject: 'REJECTED', value: 'foob', delay: '1200' }
// ###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aaa > reject:  { reject: 'REJECTED', value: 'fooberrrrr', delay: '15000' }

export async function getMetaWeather(location) {

  // >>>>>>>>>>>>>>>>>>>>>>>>>> RE-CAP | RE-FOCUS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // >>>>>>>>>>>>>>>>>>>>>>>>>>> test area only! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // >>>>>>>> 'mockAPI' is returned promise to load() action
  // >>>>>>>> original use case here for 'async' function was an API request
  // >>>>>>>> 'awaiting' the AXIOS/FETCH api request
  // getting things a bit conflated mixing in promise testing in an 'async/awaited' function
  // >>>>>>>> ultimately, not passing a promise here, just a resolved value (last await)

  try {

    // const response = await axios.get(location);
    // const e = await awaitForReturnValueOfAFunction(response.data);
    // return e;

  } catch (error) {
    console.log('###### mockAPI() > getMetaWeather() > axios.get(location) > catch > error: ', error);
    return error;
  }

  const dn = Date.now();

  const startSetTimeoutArrayLong = [];
  startSetTimeoutArrayLong.push(startResolvedPromise(2500));
  startSetTimeoutArrayLong.push(startResolvedPromise(22250));

  const startSetTimeoutArrayFast = [];
  startSetTimeoutArrayFast.push(startResolvedPromise(100));
  startSetTimeoutArrayFast.push(startResolvedPromise(300));

  // -------------------------

  startSetTimeout(dn, 10000);

  // -------------------------

  const g = await startResolvedPromise(4000);
  console.log('###### mockAPI() > getMetaWeather() > startResolvedPromise(4000): ', (g-dn) );

  // -------------------------

  const pAf1 = await Promise.all(startSetTimeoutArrayFast);
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast1-0: ', (pAf1[0]-dn) );
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast1-1: ', (pAf1[1]-dn) );

  // -------------------------

  const p = await startResolvedPromise(1500);
  console.log('###### mockAPI() > getMetaWeather() > startResolvedPromise(1500): ', (p-dn) );

  // -------------------------

  const pAl = await Promise.all(startSetTimeoutArrayLong);
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayLong1-0: ', (pAl[0]-dn) );
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayLong1-1: ', (pAl[1]-dn) );

  // -------------------------

  const b = await startResolvedPromise(100);
  console.log('###### mockAPI() > getMetaWeather() > startResolvedPromise(100): ', (b-dn) );

  const z = await startResolvedPromise(4000);
  console.log('###### mockAPI() > getMetaWeather() > startResolvedPromise(4000): ', (z-dn) );

  // -------------------------

  const a = startResolvedRejectedPromise('foober', 500);

  a.then(
    (val) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > a > resolve: ', val ) },
    (error) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > a > reject: ', error ) }
  );

  const aa = startResolvedRejectedPromise('json', 600);

  aa.then(
    (val) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aa > resolve: ', val ) },
    (error) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aa > reject: ', error ) }
  );

  const aaa = startResolvedRejectedPromise('fooberrrrr', 15000);

  aaa.then(
    (val) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aaa > resolve: ', val ) },
    (error) => { console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > aaa > reject: ', error ) }
  );

  // -------------------------

  const pAf2 = await Promise.all(startSetTimeoutArrayFast);
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast2-0: ', (pAf2[0]-dn) );
  console.log('###### mockAPI() > getMetaWeather() > startSetTimeoutArrayFast2-1: ', (pAf2[1]-dn) );

  // -------------------------

  try {

    const k = await startResolvedRejectedPromise('foob', 1200);
    return k;

  } catch (error) {

    console.log('###### mockAPI() > getMetaWeather() > startResolvedRejectedPromise > k catch > error: ', error);
    return error;
  }
}

export function mockAPI(doWhat, delay) {
  console.log('###### mockAPI() > mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
