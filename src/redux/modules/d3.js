// Actions
// -------------------
const LOAD = 'redux-example/d3/LOAD';
const LOAD_SUCCESS = 'redux-example/d3/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/d3/LOAD_FAIL';

import { mockAPI, getRandomInt, getSomeAsyncData } from '../../utils/mockAPI';

import initialState from '../initial-state';

// Reducer
// -------------------
export default function info(state = initialState.d3, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> d3 > redux > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> d3 > redux > SWITCH > action.type > LOAD_SUCCESS > action.result: ', action);
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.result
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> d3 > redux > SWITCH > action.type > LOAD_FAIL > action.error: ', action);
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
  console.log('>>>>>>>>>>>>>>>> d3 > redux > Action > isLoaded() ??: ', globalState.info && globalState.info.loaded);
  return globalState.info && globalState.info.loaded;
}

export function load() {
  console.log('>>>>>>>>>>>>>>>> d3 > redux > Action > load() <<<<<<<<<<<<<<<<<<');
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    // promise: () => mockAPI(() => getRandomInt())
    promise: () => mockAPI(() => getSomeAsyncData(location))
  };
};
