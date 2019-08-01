// Actions
// -------------------
const LOAD = 'redux-example/lineChart/LOAD';
const LOAD_SUCCESS = 'redux-example/lineChart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/lineChart/LOAD_FAIL';

const ADD_NEW_DATA_LOAD = 'redux-example/lineChart/ADD_NEW_DATA_LOAD';
const ADD_NEW_DATA_LOAD_SUCCESS = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_SUCCESS';
const ADD_NEW_DATA_LOAD_FAIL = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_FAIL';

// const PATCH_NEW_DATA = 'redux-example/lineChart/PATCH_NEW_DATA';
// const PATCH_NEW_DATA_SUCCESS = 'redux-example/lineChart/PATCH_NEW_DATA_SUCCESS';
// const PATCH_NEW_DATA_FAIL = 'redux-example/lineChart/PATCH_NEW_DATA_FAIL';

import { mockAPI, postRequestConcat } from '../../utils/mockAPI';
import initialState from '../initial-state';

// "concat" method adds multiple elements to the array and returns a copy

// Reducer
// -------------------
export default function reducer(state = initialState.lineChart, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        loading: true
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
        data: action.result.values
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
        loading: true
      };

    case ADD_NEW_DATA_LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_SUCCESS > state: ', state);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADD_NEW_DATA_LOAD_SUCCESS > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
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
        loaded: false,
        error: true,
        errorResponse: action.result,
      };

    // case PATCH_NEW_DATA:
    //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > PATCH_NEW_DATA > action: ', action);
    //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > PATCH_NEW_DATA > action.result: ', action.result);
    //   return {
    //     ...state,
    //     loadingD: true,
    //   };

    // case PATCH_NEW_DATA_SUCCESS:
    //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > PATCH_NEW_DATA_SUCCESS > action: ', action);
    //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > PATCH_NEW_DATA_SUCCESS > action.result: ', action.result);
    //   return {
    //     ...state,
    //     loadingD: false,
    //     errorD: false,
    //     data: state.data.concat(action.newData)
    //   };

    // case PATCH_NEW_DATA_FAIL:
    //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > PATCH_NEW_DATA_FAIL');
    //   return {
    //     ...state,
    //     loadingD: false,
    //     errorD: true,
    //     errorResponseD: action.result,
    //   };

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

export function addNewDataFunc(req) {
  console.log('>>>>>>>>>>>>>>>> lineChart > redux > Action > addNewDataFunc() > req: ', req);
  return {
    types: [ADD_NEW_DATA_LOAD, ADD_NEW_DATA_LOAD_SUCCESS, ADD_NEW_DATA_LOAD_FAIL],
    promise: () => mockAPI(() => postRequestConcat(req))
  };
}

// // 200 (OK) - 204 (No Content) - 404 (Not Found)
// export function patchMessage(id, data) {
//   return {
//     types: [PATCH_NEW_DATA, PATCH_NEW_DATA_SUCCESS, PATCH_NEW_DATA_FAIL],
//     promise: () => mockAPI(() => patchHttpMethod(status))
//   };
// }
