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
        resolve({
          city: 'New York, NY',
          forecast: 'JSON',
          PromiseStatus: 'resolved'
        })
      } else {
        reject('The forecast for New York, NY is Stringy and the PromiseStatus rejected.');
      }
    }, 4500);
  });
}

function awaitForReturnValueOfAFunction(r) {
  return r;
}

function startATask() {
  return new Promise(resolve => {
    setTimeout(() => resolve( getDateNow() ), 5000);
  });
}

// create a promise for each async call
// add all the promises to an array
// pass the promises array to Promise.all (this returns a single promise to use await on)

export async function getMetaWeather(location) {
  try {

    // const response = await axios.get(location);
    // const e = awaitForReturnValueOfAFunction(response.data);
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > e: ', e);
    // const z = await startATask();
    const z = startATask();
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > z: ', z);
    const a = await awaitForReturnValueOfAFunction(response.data);
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > a: ', a);
    const k = mostBasicPromiseResolveRejectPending('json');
    console.log('################### mockAPI() > getMetaWeather() > mostBasicPromiseResolveRejectPending > k: ', k);

    // return both 
    return k;
  } catch (error) {
    console.error(error);
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
