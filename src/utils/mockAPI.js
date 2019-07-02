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
  console.log('################### mockAPI() > getDateNow: ', nd);
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
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve( {
      city: 'New York',
      forecast: 'partly cloudy'
    } ), 200);
  });
}

function mostBasicPromiseResolveRejectPending(v) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'json') {
        resolve({
          city: 'New York, NY',
          forecast: 'JSON',
          PromiseStatus: 'resolved'
        });
      } else {
        // reject('The forecast for New York, NY is Stringy and the PromiseStatus rejected.');
        // reject(new Error(`waitFile: timeout (${timeout}ms): ${path}`));
        reject({
          city: 'reject',
          forecast: 'reject',
          PromiseStatus: 'reject'
        });
      }
    }, 1000);
  });
}

function awaitForReturnValueOfAFunction(r) {
  return r;
}

function startATask(dn, delay) {
  // setTimeout(() => getDateNowAsync(dn), delay);
  setTimeout(() => getDateNow2(dn), delay);
}

function startATaskPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( getDateNow() ), delay);
  });
}

function basicResolveReject(v, delay) {
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
// await: blocks next lines of code
// await: does not block execution of (previous) promises

export async function getMetaWeather(location) {
  try {

    // const response = await axios.get(location);
    // const e = awaitForReturnValueOfAFunction(response.data);
    // console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > e: ', e);

    const dn = Date.now();

    const startATaskArrayLong = [];
    startATaskArrayLong.push(startATaskPromise(2500));
    startATaskArrayLong.push(startATaskPromise(2250));

    const startATaskArrayFast = [];
    startATaskArrayFast.push(startATaskPromise(100));
    startATaskArrayFast.push(startATaskPromise(300));

    // -------------------------

    startATask(dn, 20000);

    // -------------------------

    const g = await startATaskPromise(4000);
    console.log('################### mockAPI() > getMetaWeather() > startATaskPromise(4000): ', (g-dn) );

    // -------------------------

    const pAf1 = await Promise.all(startATaskArrayFast);
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayFast1-0: ', (pAf1[0]-dn) );
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayFast1-1: ', (pAf1[1]-dn) );

    // -------------------------

    const p = await startATaskPromise(1500);
    console.log('################### mockAPI() > getMetaWeather() > startATaskPromise(1500): ', (p-dn) );

    // -------------------------

    const pAl = await Promise.all(startATaskArrayLong);
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayLong1-0: ', (pAl[0]-dn) );
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayLong1-1: ', (pAl[1]-dn) );

    // -------------------------

    const b = await startATaskPromise(100);
    console.log('################### mockAPI() > getMetaWeather() > startATaskPromise(100): ', (b-dn) );

    const z = await startATaskPromise(4000);
    // const z = await startATaskPromise(2000);
    console.log('################### mockAPI() > getMetaWeather() > startATaskPromise(4000): ', (z-dn) );

    // -------------------------

    try {
      const a = await basicResolveReject('foober', 500);
      console.log('################### mockAPI() > getMetaWeather() > basicResolveReject: ', a);

      const aa = await basicResolveReject('json', 600);
      console.log('################### mockAPI() > getMetaWeather() > basicResolveReject: ', aa);

    } catch (error) {
      console.log('################### mockAPI() > getMetaWeather() > basicResolveReject > catch > error: ', error);
    }

    // -------------------------

    const k = await mostBasicPromiseResolveRejectPending('jsonX');
    console.log('################### mockAPI() > getMetaWeather() > mostBasicPromiseResolveRejectPending: ', k);

    // -------------------------

    const pAf2 = await Promise.all(startATaskArrayFast);
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayFast2-0: ', (pAf2[0]-dn) );
    console.log('################### mockAPI() > getMetaWeather() > startATaskArrayFast2-1: ', (pAf2[1]-dn) );

    // -------------------------

    return  k;

  } catch (error) {
    console.log('################### mockAPI() > getMetaWeather() > catch > error: ', error);
    return error;
  }
}

export function mockAPI(doWhat, delay) {
  console.log('################### mockAPI() > mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
