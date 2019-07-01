// Actions
// -------------------
const LOAD = 'redux-example/info/LOAD';
const LOAD_SUCCESS = 'redux-example/info/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/info/LOAD_FAIL';

import { mockAPI, getDateNow, getRandomInt, getMetaWeather } from '../../utils/mockAPI';

import initialState from '../initial-state';

// Reducer
// -------------------
export default function info(state = initialState.info, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> info > redux > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> info > redux > SWITCH > action.type > LOAD_SUCCESS > action.result: ', action.result);
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.result
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> info > redux > SWITCH > action.type > LOAD_FAIL > action.result: ', action.result);
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.error
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
export function isLoaded(globalState) {
  console.log('>>>>>>>>>>>>>>>> info > redux > Action > isLoaded() ??: ', globalState.info && globalState.info.loaded);
  return globalState.info && globalState.info.loaded;
}

// export function load() {
//   console.log('>>>>>>>>>>>>>>>> info > redux > Action > load() <<<<<<<<<<<<<<<<<<');
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: () => mockAPI(() => getDateNow(), 1000 )
//   };
// };

// create a promise for each async call
// add all the promises to an array
// pass the promises array to Promise.all (this returns a single promise to use await on)

export function load() {
  console.log('>>>>>>>>>>>>>>>> info > redux > Action > load() <<<<<<<<<<<<<<<<<<');
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => mockAPI(() => getMetaWeather(location))
  };
};

// export function load(value) {
//   console.log('>>>>>>>>>>>>>>>> info > redux > Action > load() <<<<<<<<<<<<<<<<<<');
//   let w = 'https://www.metaweather.com/api/location/2459115/';
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: ({ client }) => client.get(w)
//   };
// };
