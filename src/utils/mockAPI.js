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
  return Math.floor(Math.random() * (100 - 1)) + 1
}

// export function getDateNow(){
//   return Date.now()
// }

export async function getDateNow(){
  const d = await Date.now();
  console.log('################### mockAPI() > getDateNow() > d: ', d);
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
        console.log('################### mockAPI() > vvvvvvvvvvvvvvv 1: ', v);
        resolve({
          city: 'New York, NY',
          forecast: 'JSON',
          PromiseStatus: 'resolved'
        });
      } else {
        console.log('################### mockAPI() > vvvvvvvvvvvvvvv 2: ', v);
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

function startATask(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( getDateNow() ), delay);
  });
}

// create a promise for each async call
// add all the promises to an array
// pass the promises array to Promise.all (this returns a single promise to use await on)

// couldn't see the forest because of all the tree's in the way!!!!!

// 2nd promise is rejected but being resolved and returned on 1st promise from reducer load action

export async function getMetaWeather(location) {
  try {

    // const response = await axios.get(location);
    // const e = awaitForReturnValueOfAFunction(response.data);
    // console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > e: ', e);

    const startATaskArrayAwait = [];

    startATaskArrayAwait.push(startATask(1000));
    startATaskArrayAwait.push(startATask(500));

    const startATaskArrayNoAwait = [];

    startATaskArrayNoAwait.push(startATask(500));
    startATaskArrayNoAwait.push(startATask(1250));

    const paa = await Promise.all(startATaskArrayAwait);
    console.log('################### mockAPI() > getMetaWeather() > startATask > paa: ', paa);

    const z = startATask(2000);
    // const z = await startATask(2000);
    console.log('################### mockAPI() > getMetaWeather() > startATask > z: ', z);

    // const a = await awaitForReturnValueOfAFunction(response.data);
    // console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > a: ', a);

    const k = await mostBasicPromiseResolveRejectPending('json');
    console.log('################### mockAPI() > getMetaWeather() > mostBasicPromiseResolveRejectPending > k: ', k);

    const pana = await Promise.all(startATaskArrayNoAwait);
    console.log('################### mockAPI() > getMetaWeather() > startATask > pana: ', pana);

    return  k;

  } catch (error) {
    console.log('################### mockAPI() > getMetaWeather() > CATCH > ERROR: ', error);
    return error;
  }
}

export function mockAPI(doWhat, delay) {
  console.log('################### mockAPI() > mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}

// export function mockAPI(delay) {
//   return new Promise(( resolve ) => {
//     setTimeout( () => resolve(), delay);
//   });
// }
