import axios from 'axios';

// var simple = (a) => {return a} // A simple function
// simple(5) // called by its name

// var obj = {simple : (a) => {return a} } // A simple method
// obj.simple(5) // called by its name along with its associated object

// data: {
//   consolidated_weather: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//   time: '2019-06-29T22:25:24.534281-04:00',
//   sun_rise: '2019-06-29T05:27:33.291985-04:00',
//   sun_set: '2019-06-29T20:31:20.255954-04:00',
//   timezone_name: 'LMT',
//   parent: {
//     title: 'New York',
//     location_type: 'Region / State / Province',
//     woeid: 2347591,
//     latt_long: '42.855350,-76.501671'
//   },
//   sources: [
//     [Object], [Object],
//     [Object], [Object],
//     [Object], [Object],
//     [Object], [Object]
//   ],
//   title: 'New York',
//   location_type: 'City',
//   woeid: 2459115,
//   latt_long: '40.71455,-74.007118',
//   timezone: 'US/Eastern'
// }

// Math.floor(x) numeric function
export function getRandomInt() {
  return Math.floor(Math.random() * (100 - 1)) + 1
}

// export function getDateNow(){
//   return Date.now()
// }

// await the returned value of function
export async function getDateNow(){
  const d = await Date.now();
  console.log('################### mockAPI() > getDateNow() > d: ', d);
  return d;
}

function interruptingTask1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('################### mockAPI() > interruptingTask1() > Promise resolved');
      resolve(interruptingTask2());
    }, 1000);
  });
}

function startingTask() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('################### mockAPI() > startingTask() > Promise resolved');
      resolve(interruptingTask1());
    }, 1000);
  });
}

function returnValueOfAFunction(r) {
  return r.data
}

export async function getMetaWeather(location) {
  try {
    const response = await axios.get(location);
    const d = await returnValueOfAFunction(response);
    console.log('################### mockAPI() > getMetaWeather() > response.data: ', d);
    return d;
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
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