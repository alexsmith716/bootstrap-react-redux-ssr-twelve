// Actions
// -------------------
const LOAD = 'redux-example/filterableTable/LOAD';
const LOAD_SUCCESS = 'redux-example/filterableTable/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/filterableTable/LOAD_FAIL';

const SELECTED_OPTION = 'redux-example/filterableTable/SELECTED_OPTION';

const HANDLE_FILTER_TEXT_CHANGE = 'redux-example/filterableTable/HANDLE_FILTER_TEXT_CHANGE';
const HANDLE_IN_STOCK_CHANGE = 'redux-example/filterableTable/HANDLE_IN_STOCK_CHANGE';
const HANDLE_DROPDOWN_CHANGE = 'redux-example/filterableTable/HANDLE_DROPDOWN_CHANGE';

const initialState = {
  loaded: false,
  data: null,
  // filterText: '',
  // inStockOnly: false,
  // loaded: false,
  // dropDownOptionSelected: '',
  // error: false,
  // errorResponse: {
  //   message: '',
  //   documentation_url: '',
  // },
  // loading: false,
  // data: null,
  // didInvalidate: false,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case SELECTED_OPTION:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > SELECTED_OPTION > state: ', state);
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > SELECTED_OPTION > action: ', action);
      return {
        ...state,
        loading: true,
        dropDownOptionSelected: action.option,
      };

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_SUCCESS > state: ', state);
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_SUCCESS > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        filterText: '',
        inStockOnly: null,
        errorResponse: {message:'', documentation_url:''},
        data: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_FAIL > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorResponse: action.result,
      };

    default:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > default > state: ', state);
      return state;
  }
};

// Actions (action creators)
// an action is a JavaScript object that has a 'type' and an optional 'payload' (data)
// -------------------
export function selectedOption(value) {
  return {
    type: SELECTED_OPTION,
    option: value.selected
  };
};

export function load(value) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(value.request)
  };
};
