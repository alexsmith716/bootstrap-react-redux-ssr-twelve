import axios from 'axios';

// var simple = (a) => {return a} // A simple function
// simple(5) // called by its name

// var obj = {simple : (a) => {return a} } // A simple method
// obj.simple(5) // called by its name along with its associated object

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

function awaitForReturnValueOfAFunction(r) {
  return r;
}

function startATask() {
  return new Promise(resolve => {
    setTimeout(() => resolve( getDateNow2() ), 5000);
  });
}

export async function getMetaWeather(location) {
  try {
    const response = await axios.get(location);
    const e = awaitForReturnValueOfAFunction(response.data);
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > e: ', e);
    // const z = await startATask();
    const z = startATask();
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > z: ', z);
    const a = await awaitForReturnValueOfAFunction(response.data);
    console.log('################### mockAPI() > getMetaWeather() > awaitForReturnValueOfAFunction > a: ', a);
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