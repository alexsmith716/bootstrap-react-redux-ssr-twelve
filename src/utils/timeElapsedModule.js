
// es6 module > closures
// emulate private methods with closures
// private methods: manage global namespace by controlling exposure of API methods

// create an anonymous function and assign to var 'timeElapsedModule'
const timeElapsedModule = () => {

  // private functions and variables
  let startedTime = 0;
  let elapsedTime = 0;

  function timeSet() {
    startedTime = Date.now();
  }

  function timeElapsed() {
    return elapsedTime = (Date.now() - startedTime) / 1000;
  }

  // ------------------------------------------------------

  // DON'T FORGET THE COMMA SEPERATING THE 

  // single lexical environment shared by public functions
  // these functions have access to above private items through JS's lexical scoping
  return {

    setStartTime: () => {
      timeSet();
    },

    getStartTime: () => {
      return startedTime;
    },

    getSecondsElapsed: () => {
      return timeElapsed();
    },

  };
};

export default timeElapsedModule;
