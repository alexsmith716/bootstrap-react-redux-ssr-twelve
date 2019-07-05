
// es6 module > closures

const timeElapsedModule = (() => {

  let startedTime = 0;
  let elapsedTime = 0;

  function timeSet() {
    startedTime = Date.now();
  }

  function timeElapsed() {
    elapsedTime = (Date.now() - startedTime) / 1000;
  }

  return {

    secondsElapsed: () => {
      timeElapsed();
      return elapsedTime;
    },

    startTime: () => {
      timeSet();
      return startedTime;
    },

  };
})();

export default timeElapsedModule;
