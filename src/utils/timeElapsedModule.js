
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

// 3 closure scopes:
// ----------------------------
// * local scope (own scope)
// * outer function scope
// * global scope


// console.log('###### mockAPI > getSomeAsyncData > timeElapsedModule.secondsElapsed(): ', timeElapsedModule.secondsElapsed());

// console.log('###### mockAPI > getSomeAsyncData > timeElapsedModule.startTime(): ', timeElapsedModule.startTime());
