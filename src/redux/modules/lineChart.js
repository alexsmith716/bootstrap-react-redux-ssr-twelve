// Actions
// -------------------
const LOAD = 'redux-example/lineChart/LOAD';
const LOAD_SUCCESS = 'redux-example/lineChart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/lineChart/LOAD_FAIL';

const ADDED_DATA = 'redux-example/lineChart/ADDED_DATA';

import initialState from '../initial-state';

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
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > LOAD_SUCCESS > action.result: ', action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result
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

    case ADDED_DATA:
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADDED_DATA > action: ', action);
      console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > reducer > SWITCH > action.type > ADDED_DATA > action.result: ', action.result);
      return {
        ...state,
        addedData: action.result
        // data: state.data.concat(action.result)
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

export function load(value) {
  console.log('>>>>>>>>>>>>>>>> lineChart > redux > Action > load() <<<<<<<<<<<<<<<<<<: ', value);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(value.request)
  };
};

//  export function addData(data) {
//    return {
//      type: ADD_DATA,
//      data
//    };
//  }
