// Actions
// -------------------
const LOAD = 'redux-example/lineChart/LOAD';
const LOAD_SUCCESS = 'redux-example/lineChart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/lineChart/LOAD_FAIL';

const ADD_NEW_DATA_LOAD = 'redux-example/lineChart/ADD_NEW_DATA_LOAD';
const ADD_NEW_DATA_LOAD_SUCCESS = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_SUCCESS';
const ADD_NEW_DATA_LOAD_FAIL = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_FAIL';

import { mockAPI, postRequestConcatExport } from '../../utils/mockAPI';
import initialState from '../initial-state';

// 200 (OK) - 204 (No Content) - 404 (Not Found)

// "concat" method adds multiple elements to the array and returns a copy

// Reducer
// -------------------
export default function reducer(state = initialState.lineChart, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > LOAD_SUCCESS > state: ', state);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > LOAD_SUCCESS > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.values,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > SWITCH > action.type > LOAD_FAIL > action.error: ', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorResponse: action.result,
      };

    case ADD_NEW_DATA_LOAD:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD > state: ', state);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD > action: ', action);
      return {
        ...state,
        loading: true,
      };

    case ADD_NEW_DATA_LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_SUCCESS > state: ', state);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_SUCCESS > action: ', action);
      return {
        ...state,
        loading: false,
        // loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.data,
      };

    case ADD_NEW_DATA_LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_FAIL > state: ', state);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_FAIL > action: ', action);
      return {
        ...state,
        loading: false,
        // loaded: false,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
// export function isLoaded(globalState) {
//   console.log('>>>>>>>>>>>>>>>> lineChart > redux > Action > isLoaded() ??: ', globalState.lineChart && globalState.lineChart.loaded);
//   return globalState.lineChart && globalState.lineChart.loaded;
// }

export function loadFunc(req) {
  console.log('>>>>>>>>>>>>>>>> lineChart > redux > Action > loadFunc() <<<<<<<<<<<<<<<<<<: ', req);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(req.request)
  };
};

//  https://developer.mozilla.org/en-US/docs/Web/API/Body/blob
// 'async' keyword: turns any function into a promise (invoking the function returns a promise)
// '.then()' block consumes value returned when promise fulfills
// 'await' keyword: placed before promise-based function to pause code until promise fulfills
// use 'await' when calling any function that returns a Promise

// error handling:
// retry fetching the asset ...
// show a default error message ...
// prompt user to to something else (provide a different asset URL) ...
// using synchronous 'try...catch' structure with async/await

// component
// reducer
// clientMiddleware
// reducer
// API
// API
// clientMiddleware >> resolved ? reducer > return response : reducer > LOAD_FAIL

export function addNewDataFunc(req) {
  console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > req: ', req);
  return {
    types: [ADD_NEW_DATA_LOAD, ADD_NEW_DATA_LOAD_SUCCESS, ADD_NEW_DATA_LOAD_FAIL],
    promise: async () => {
      try {
        const response = await postRequestConcatExport(req);
        console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > response: ', response);
        return response;
      } catch (error) {
        console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > ERROR1: ', error);
        const e = Promise.reject(error)
        console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > ERROR2: ', e);
        // return Promise.reject(error);
        return e;
        throw error;
      }
    }
  };
}
